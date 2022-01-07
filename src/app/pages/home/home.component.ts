import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import scrollIntoView from "scroll-into-view-if-needed";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  defaultImage = `https://www.atmosair.com/wp-content/themes/atmosair/assets/icons/loading-spinner-white-thin.gif`;

  constructor(public productService: ProductService) {}
  goToArc(name: string) {
    let arc = document.getElementById(name);
    if (arc) {
      scrollIntoView(arc, {
        // scrollMode: 'if-needed',
        behavior: "smooth",
        block: "start"
        // // inline: 'nearest',
      });
    }
  }

  ngOnInit(): void {}
}
