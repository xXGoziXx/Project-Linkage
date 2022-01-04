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

@Injectable({
  providedIn: "root"
})
export class ProductService {
  arcs: Observable<Arc[]> | undefined; // watches the product metadata values
  arcs$: Subscription | undefined; // subscribes to the product metadata values
  private productDoc: AngularFirestoreDocument<CategoryMetadata>; // stores all the references to the product metadata
  productMetadata$: Subscription | undefined; // subscribes to the product metadata values
  products: { name: string; order: number; items: Product[] }[] = [];
  constructor(private afs: AngularFirestore) {
    this.productDoc = afs.doc<CategoryMetadata>("products/metadata");
    this.arcs = afs
      .collection<Arc>("arcs", ref => ref.orderBy("date"))
      .valueChanges();
    this.arcs$ = this.arcs.subscribe((arc: Arc[] | undefined) => {
      console.log("arc", arc);
    });
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
        console.log("categories", categories);
        return null;
      });
  }
  sortBy(array: any[], prop: string) {
    return array.sort((a, b) =>
      a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1
    );
  }
}
