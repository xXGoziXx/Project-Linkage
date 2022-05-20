import { Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

import { SizingChart } from "../interfaces/sizing";

@Injectable({
  providedIn: "root"
})
export class SizingChartService {
  sizingChartDataObserver: Observable<SizingChart[]>;
  sizingCharts: SizingChart[] = [];

  constructor(private afs: AngularFirestore) {
    this.sizingChartDataObserver = afs
      .collection<SizingChart>("sizing", ref => ref.orderBy("order", "asc"))
      .valueChanges();
  }
}
