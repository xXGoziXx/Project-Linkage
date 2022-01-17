import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.scss"]
})
export class StoreComponent implements OnInit {
  defaultImage = `https://www.atmosair.com/wp-content/themes/atmosair/assets/icons/loading-spinner-white-thin.gif`;

  previewButtonIcon = {
    show: "../../../assets/icons/eye.svg",
    hide: "../../../assets/icons/eye-slash.svg"
  };


  constructor(public productService: ProductService) {}
  get selectedProductFirstImage() {
    return this.productService.selectedProduct.images.filter(
      image => !image.order
    )[0];
  }
  get selectedProductSizes() {
    return this.productService.selectedProduct.sizes.join(" / ");
  }

  selectProduct(value: any) {
    // console.log(value);
    this.productService.selectedProduct = { ...value, quantity: 1 };
    if (this.productService.selectedProduct.sizes.length) {
      this.productService.selectedProduct.sizes =
        this.productService.selectedProduct.sizes.map(size => {
          if (size.name) {
            return size;
          }
          return {
            name: size,
            selected: false
          };
        });
      this.productService.selectedProduct.size = "";
    }
  }

  selectSize(i: number) {
    this.productService.selectedProduct.sizes?.forEach(
      (size, index) =>
        (this.productService.selectedProduct.sizes[index].selected = false)
    );
    this.productService.selectedProduct.sizes[i].selected = true;
  }

  checkSize() {
    if (
      this.productService.selectedProduct.sizes.length &&
      this.productService.selectedProduct.sizes.find(size => size.selected)
    ) {
      return false;
    } else if (this.productService.selectedProduct.sizes.length) return true;
    else return false;
  }
  ngOnInit(): void {}
}
