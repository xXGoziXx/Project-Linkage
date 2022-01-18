import { Component, OnInit } from "@angular/core";
import { Columns, Config, DefaultConfig } from "ngx-easy-table";

@Component({
  selector: "app-sizing-fit",
  templateUrl: "./sizing-fit.component.html",
  styleUrls: ["./sizing-fit.component.scss"]
})
export class SizingFitComponent implements OnInit {
  sizeChart = [
    {
      size: "S",
      length: "73.65CM",
      width: "53.7CM",
      armLength: "62.6CM",
      armWidth: "26CM"
    },
    {
      size: "M",
      length: "74.6CM",
      width: "55.9CM",
      armLength: "64.5CM",
      armWidth: "29.2CM"
    },
    {
      size: "L",
      length: "80CM",
      width: "57.1CM",
      armLength: "66.3CM",
      armWidth: "30.4CM"
    },
    {
      size: "XL",
      length: "81.1CM",
      width: "59CM",
      armLength: "70.5CM",
      armWidth: "27.8CM"
    }
  ];
  public columns: Columns[] = [
    { key: "size", title: "Size" },
    { key: "length", title: "Length" },
    { key: "width", title: "Width" },
    { key: "armLength", title: "Arm Length" },
    { key: "armWidth", title: "Arm Width" }
  ];
  public configuration: Config = {
    ...DefaultConfig,
    paginationEnabled: false
  };

  constructor() {}

  ngOnInit(): void {}
}
