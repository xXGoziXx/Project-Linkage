import { Component, OnInit, TemplateRef } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/interfaces/product";
import { StateChange } from "ng-lazyload-image";
import { trigger, transition, style, animate } from "@angular/animations";
@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.scss"],
  animations: [
    trigger("fadeOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("300ms", style({ opacity: 1 }))
      ])
    ])
  ]
})
export class StoreComponent implements OnInit {
  defaultImage = `https://www.atmosair.com/wp-content/themes/atmosair/assets/icons/loading-spinner-white-thin.gif`;

  constructor(public productService: ProductService) {}
  get selectedProductFirstImage() {
    return this.productService.selectedProduct.images.filter(
      image => !image.order
    )[0];
  }
  get selectedProductSizes() {
    return this.productService.selectedProduct.sizes.join(" / ");
  }

  checkSizesAvailable(product: Product) {
    return product.sizes.filter(
      size => this.productService.selectedProduct.stock[size] !== 0
    );
  }
  selectProduct(value: any) {
    this.productService.selectedProduct = { ...value, quantity: 1, size: "" };
    if (!this.productService.selectedProduct.sizes.length) {
      this.productService.selectedProduct.size = "R";
    }
    // console.log(this.productService.selectedProduct);
  }

  selectSize(size: string) {
    this.productService.selectedProduct.size = size;
  }
  getTotalStock(stock: Product["stock"]) {
    let totalStock = 0;
    Object.keys(stock).forEach((size: string) => {
      totalStock += stock[size] || 0;
    });
    return totalStock;
  }
  getStock(product: Product): number {
    if (product.sizes.length) {
      return product.stock[product.size];
    } else {
      return product.stock.R;
    }
  }
  getItemStatus() {
    const product = this.productService.selectedProduct;
    const duplicateProduct = this.productService.cart.items.findIndex(item => {
      return item.name === product.name && item.size === product.size;
    });
    if (this.productService.selectedProduct.size === "") {
      return "Select size";
    } else if (
      this.productService.selectedProduct.stock[
        this.productService.selectedProduct.size
      ] <= 0
    ) {
      return "Sold Out";
    } else if (
      duplicateProduct !== -1 &&
      this.productService.cart.items[duplicateProduct].quantity >=
        this.productService.cart.items[duplicateProduct].stock[product.size]
    ) {
      return "Max reached";
    }
    return "Add to cart";
  }

  stateChangeHandler(event: StateChange, index: number) {
    switch (event.reason) {
      case "setup":
        // The lib has been instantiated but we have not done anything yet.
        break;
      case "observer-emit":
        // The image observer (intersection/scroll/custom observer) has emit a value so we
        // should check if the image is in the viewport.
        // `event.data` is the event in this case.
        break;
      case "start-loading":
        // The image is in the viewport so the image will start loading
        break;
      case "mount-image":
        // The image has been loaded successfully so lets put it into the DOM
        break;
      case "loading-succeeded":
        // The image has successfully been loaded and placed into the DOM
        const soldOut: HTMLElement | null = document.getElementById(
          "soldOut" + index
        );
        const blackFilter: HTMLElement | null = document.getElementById(
          "blackFilter" + index
        );
        if (soldOut && blackFilter) {
          soldOut.style.opacity = "1";
          blackFilter.style.opacity = "1";
        }
        break;
      case "loading-failed":
        // The image could not be loaded for some reason.
        // `event.data` is the error in this case
        break;
      case "finally":
        // The last event before cleaning up
        break;
    }
  }
  ngOnInit(): void {}
}
