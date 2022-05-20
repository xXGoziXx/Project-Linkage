import { Injectable } from "@angular/core";
import { Arc } from "../interfaces/arc";
import { Observable, Subscription } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root"
})
export class ArcService {
  arcs: Observable<Arc[]> | undefined; // watches the arcs
  arcs$: Subscription | undefined; // subscribes to the arcs
  constructor(afs: AngularFirestore) {
    this.arcs = afs
      .collection<Arc>("arcs", ref => ref.orderBy("date", "desc"))
      .valueChanges();
  }

  sortBy(array: any[], prop: string) {
    return array.sort((a, b) =>
      a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1
    );
  }
}
