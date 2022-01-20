import { Injectable } from "@angular/core";
import { Product } from "src/app/interfaces/product";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/compat/firestore";
import { Observable, Subscription } from "rxjs";
import { Category, CategoryMetadata } from "../interfaces/category-metadata";
import { Arc } from "../interfaces/arc";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Splide } from "@splidejs/splide";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  arcs: Observable<Arc[]> | undefined; // watches the product metadata values
  arcs$: Subscription | undefined; // subscribes to the product metadata values
  private productDoc: AngularFirestoreDocument<CategoryMetadata>; // stores all the references to the product metadata
  productMetadata$: Subscription | undefined; // subscribes to the product metadata values
  products: { name: string; order: number; items: Product[] }[] = [];
  preview = true;
  showProductCard = false;
  defaultImage = `https://www.atmosair.com/wp-content/themes/atmosair/assets/icons/loading-spinner-white-thin.gif`;
  selectedProduct!: Product /*= {
    description: `Fire, Lightning, Earth, Water and Wind (火雷土水風) are the five kanji symbols used at the back of the fleece. They represent the five Kage with a quote paraphrased from Itachi about being "acknowledged by the people" when you're someone who can lead a nation.`,
    price: 34.99,
    images: [
      {
        alt: "",
        order: 0,
        src: "https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Fleeces%2FRed%20Fleece%2FONE%20PIECE%20IRISH%20IRELAND%20ANIME%20DOFLAMINGO%20FAN%20COSPLAY-min.png?alt=media&token=6c7697ba-d122-4eba-9649-9b0690bfac47"
      },
      {
        alt: "",
        order: 1,
        src: "https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Fleeces%2FRed%20Fleece%2FNARUTO%20ANIME%205%20KAGE%20CLOTHING%20IRELAND%20OTAKU%20WEEB%20FAN-min.png?alt=media&token=638488a4-5b55-48bf-93e2-7c6c8e1ac69e"
      },
      { alt: "", order: 2, src: this.defaultImage }
    ],
    name: "Red Fleece",
    order: 0,
    sizes: [
      { name: "S", selected: false },
      { name: "M", selected: false },
      { name: "L", selected: false },
      { name: "XL", selected: false }
    ],
    size: "",
    quantity: 1
  }*/;
  cart: { items: Product[]; totalPrice: number; totalQuantity: number } = {
    items: [
      /*{
        description: `Fire, Lightning, Earth, Water and Wind (火雷土水風) are the five kanji symbols used at the back of the fleece. They represent the five Kage with a quote paraphrased from Itachi about being "acknowledged by the people" when you're someone who can lead a nation.`,
        price: 34.99,
        images: [
          {
            alt: "",
            order: 0,
            src: "https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Fleeces%2FRed%20Fleece%2FONE%20PIECE%20IRISH%20IRELAND%20ANIME%20DOFLAMINGO%20FAN%20COSPLAY-min.png?alt=media&token=6c7697ba-d122-4eba-9649-9b0690bfac47"
          },
          {
            alt: "",
            order: 1,
            src: "https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Fleeces%2FRed%20Fleece%2FNARUTO%20ANIME%205%20KAGE%20CLOTHING%20IRELAND%20OTAKU%20WEEB%20FAN-min.png?alt=media&token=638488a4-5b55-48bf-93e2-7c6c8e1ac69e"
          },
          { alt: "", order: 2, src: this.defaultImage }
        ],
        name: "Red Fleece",
        order: 0,
        sizes: [
          { name: "S", selected: false },
          { name: "M", selected: false },
          { name: "L", selected: false },
          { name: "XL", selected: true }
        ],
        size: "XL",
        quantity: 1
      }*/
    ],
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
    this.arcs = afs
      .collection<Arc>("arcs", ref => ref.orderBy("date", "desc"))
      .valueChanges();
    this.productMetadata$ = this.productDoc
      .valueChanges()
      .subscribe((metadata: CategoryMetadata | undefined) => {
        const categories = metadata?.categories;
        // checking to make sure the categories aren't empty
        if (categories) {
          categories.map((category: Category) => {
            const productCategoryCol: AngularFirestoreCollection<Product> =
              afs.collection<Product>(category.name, ref =>
                ref.orderBy("order")
              );
            productCategoryCol.valueChanges().subscribe(product => {
              // console.log(product, category);
              this.products[category.order] = {
                name: category.name,
                order: category.order,
                items: product
              };
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
  addToCart(product: Product) {
    const sizedProduct = {
      ...product,
      size: product.sizes?.find(size => size.selected)?.name || ""
    };
    // console.log(product);
    const duplicateProduct = this.cart.items.findIndex(item => {
      return item.name === sizedProduct.name && item.size === sizedProduct.size;
    });
    if (duplicateProduct === -1) {
      this.cart.items.push(sizedProduct);
      this.showSuccess(sizedProduct, this.cart.totalQuantity);
    } else {
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
      (product.size ? ` (${product.size})` : "");
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
