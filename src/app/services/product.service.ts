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

@Injectable({
  providedIn: "root"
})
export class ProductService {
  arcs: Observable<Arc[]> | undefined; // watches the product metadata values
  arcs$: Subscription | undefined; // subscribes to the product metadata values
  private productDoc: AngularFirestoreDocument<CategoryMetadata>; // stores all the references to the product metadata
  productMetadata$: Subscription | undefined; // subscribes to the product metadata values
  products: { name: string; order: number; items: Product[] }[] = [];
  cart: { items: Product[]; total: number } = {
    items: [],
    get total() {
      if (this.items.length === 0) return 0;
      const result = this.items
        .map(item => item.price * item.quantity)
        .reduce((acc, item) => acc + item);
      console.log(result);
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
  constructor(private afs: AngularFirestore, private formBuilder: FormBuilder) {
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
  addToCart(product: Product) {
    const sizedProduct = {
      ...product,
      size: product.sizes?.find(size => size.selected)?.name || ""
    };
    const duplicateProduct = this.cart.items.findIndex(item => {
      return item.name === sizedProduct.name && item.size === sizedProduct.size;
    });
    if (duplicateProduct === -1) {
      this.cart.items.push(sizedProduct);
    } else {
      this.cart.items[duplicateProduct].quantity++;
    }

    console.log(this.cart);
  }
  sortBy(array: any[], prop: string) {
    return array.sort((a, b) =>
      a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1
    );
  }
}
