import { isEqual } from "lodash-es";
import { ToastrService } from "ngx-toastr";
import { combineLatest, Observable, Subscription } from "rxjs";
import { Product } from "src/app/interfaces/product";

import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/compat/firestore";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Splide } from "@splidejs/splide";


import { Category, CategoryMetadata } from "../interfaces/category-metadata";

declare let gtag: Function;
declare let fbq: Function;
@Injectable({
  providedIn: "root"
})
export class ProductService {

  private productDoc: AngularFirestoreDocument<CategoryMetadata>; // stores all the references to the product metadata
  productMetadata$: Subscription | undefined; // subscribes to the product metadata values
  products: { name: string; order: number; items: Product[] }[] = [];
  preview = true;
  showProductCard = false;
  defaultImage = `https://www.atmosair.com/wp-content/themes/atmosair/assets/icons/loading-spinner-white-thin.gif`;
  selectedProduct!: Product;
  cart: { items: Product[]; totalPrice: number; totalQuantity: number } = {
    items: [],
    get totalPrice() {
      if (this.items.length === 0) return 0;
      const result = this.items
        .map(item => item.price * item.quantity)
        .reduce((acc, item) => acc + item);
      return Number(parseFloat(String(result)).toFixed(2));
    },
    get totalQuantity() {
      if (this.items.length === 0) return 0;
      const result = this.items
        .map(item => item.quantity)
        .reduce((acc, item) => acc + item);
      return result;
    }
  };
  checkoutForm = this.formBuilder.group({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    address1: new FormControl("", Validators.required),
    address2: new FormControl(""),
    locality: new FormControl("", Validators.required),
    state: new FormControl("", Validators.required),
    postcode: new FormControl("", Validators.required),
    country: new FormControl("", Validators.required)
  });
  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    const itemsJSON = localStorage.getItem("project_linkage");
    if (itemsJSON) {
      // console.log(JSON.parse(itemsJSON));
      const { items } = JSON.parse(itemsJSON);
      this.cart.items = items;
    }
    this.productDoc = afs.doc<CategoryMetadata>("products/metadata");
    this.productMetadata$ = this.productDoc
      .valueChanges()
      .subscribe((metadata: CategoryMetadata | undefined) => {
        let categories = metadata?.categories
          .filter(category => category.order >= 0)
          .sort(
            (categoryA: Category, categoryB: Category) =>
              categoryA.order - categoryB.order
          )
          .map((category, index: number) => ({ ...category, order: index }));
        // console.log(categories);

        // checking to make sure the categories aren't empty
        if (categories) {
          categories.forEach((category: Category) => {
            const categoryName = category.name.split("/");
            const productCategoryCols: Observable<Product[]>[] =
              categoryName.map((name: string) =>
                afs
                  .collection<Product>(
                    name,
                    ref => ref.where("order", ">=", 0).orderBy("order") // filters out products with an order less than 0
                  )
                  .valueChanges()
              );
            const productCategoryCol: Observable<Product[][]> =
              combineLatest(productCategoryCols);
            productCategoryCol.subscribe((productsCollection: Product[][]) => {
              const products = productsCollection.reduce(
                (acc, val) => acc.concat(val),
                []
              );
              // console.log(products, category);
              if (this.products[category.order]) {
                this.products[category.order].name = category.title
                  ? category.title
                  : category.name;
                this.products[category.order].order = category.order;
                this.products[category.order].items.forEach((item, i) => {
                  if (!isEqual(item, products[i])) {
                    this.products[category.order].items[i] = products[i];
                  }
                });
              } else {
                this.products[category.order] = {
                  name: category.title ? category.title : category.name,
                  order: category.order,
                  items: products
                };
              }
              if (this.selectedProduct) {
                const updatedProduct =
                  products[
                    products.findIndex(
                      product => product.name === this.selectedProduct.name
                    )
                  ];
                for (let key in updatedProduct) {
                  let prop: keyof Product = key as keyof Product;
                  if (
                    this.selectedProduct[prop] !== updatedProduct[prop] &&
                    prop !== "images"
                  ) {
                    (<Product[keyof Product]>this.selectedProduct[prop]) =
                      updatedProduct[prop];
                  }
                }
              }
            });
          });
        }
        return null;
      });
  }

  set viewProduct(value: boolean) {
    this.showProductCard = value;
    if (this.showProductCard) {
      setTimeout(() => {
        const cardContainer = document.getElementById("card-container");

        if (cardContainer) {
          cardContainer?.addEventListener("click", e => {
            if (e.target !== e.currentTarget) return;
            this.viewProduct = false;
            this.preview = true;
          });
        }
        const main = new Splide("#main-slider", {
          type: "fade",
          width: "100%",
          rewind: true,
          pagination: false,
          arrows: false
        });
        const thumbnails = new Splide("#thumbnail-slider", {
          rewind: true,
          fixedWidth: 80,
          gap: 15,
          pagination: false,
          arrows: true,
          focus: 0,
          isNavigation: true,
          dragMinThreshold: {
            mouse: 0,
            touch: 10
          }
        });

        main.sync(thumbnails);
        main.mount();
        thumbnails.mount();
      }, 1);
    }
  }
  addToCart() {
    const product = { ...this.selectedProduct };
    const duplicateProduct = this.cart.items.findIndex(item => {
      return item.name === product.name && item.size === product.size;
    });
    const addToCart = {
      currency: "EUR",
      value: product.price,
      items: [
        {
          item_name: product.name,
          currency: "EUR",
          item_brand: "Linkage",
          price: product.price,
          quantity: product.quantity
        }
      ]
    };
    // If the product isn't in the cart
    if (duplicateProduct === -1) {
      fbq("track", "AddToCart");
      gtag("event", "add_to_cart", addToCart);
      this.cart.items.push(product);
      this.showSuccess(product, this.cart.totalQuantity);
    } // If it is and it's current quantity less than in stock
    else if (
      this.cart.items[duplicateProduct].quantity <
      this.cart.items[duplicateProduct].stock[product.size]
    ) {
      fbq("track", "AddToCart");
      gtag("event", "add_to_cart", addToCart);
      this.cart.items[duplicateProduct].quantity++;
      this.showSuccess(
        this.cart.items[duplicateProduct],
        this.cart.totalQuantity
      );
    }
    localStorage.setItem(
      "project_linkage",
      JSON.stringify({ items: this.cart.items })
    );
    // console.log(this.cart);
  }
  sortBy(array: any[], prop: string) {
    return array.sort((a, b) =>
      a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1
    );
  }

  showSuccess(product: Product, quantity: number) {
    const title =
      `#${quantity}: ` +
      product.name +
      (product.size !== "R" ? ` (${product.size})` : "");
    this.toastr.success("Item successfully added to cart!", title);
  }
  showOrderComplete() {
    this.toastr.success("Thanks for shopping with us!", "Order Completed:");
  }
  showOrderIncomplete() {
    this.toastr.success(
      "There has been an issue processing your order. Please contact us for support!",
      "Order Failed:"
    );
  }
  showMaxStockReached() {
    this.toastr.success(
      "The max number in stock has been reached!",
      "Product Notification:"
    );
  }
  async createOrder({
    id,
    email,
    name,
    country
  }: {
    id: string;
    email: string;
    name: string;
    country: string;
  }) {
    const orderDoc = this.afs.doc(`orders/${id}`);
    await orderDoc.set({ id, email, name, country });
  }
}
