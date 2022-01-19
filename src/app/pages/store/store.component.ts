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
    // show: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMzEiIHZpZXdCb3g9IjAgMCAyOCAzMSIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNMjggMTUuNDk2MkMyOCAxNS40OTYyIDIyLjc1IDQuOTcxMTkgMTQgNC45NzExOUM1LjI1IDQuOTcxMTkgMCAxNS40OTYyIDAgMTUuNDk2MkMwIDE1LjQ5NjIgNS4yNSAyNi4wMjEyIDE0IDI2LjAyMTJDMjIuNzUgMjYuMDIxMiAyOCAxNS40OTYyIDI4IDE1LjQ5NjJaTTIuMDUyNzUgMTUuNDk2MkMyLjg5ODkgMTQuMDg5OSAzLjg3MjEyIDEyLjc4MDEgNC45NTc3NSAxMS41ODY2QzcuMjEgOS4xMTk5NSAxMC4yOSA2Ljg4NDgzIDE0IDYuODg0ODNDMTcuNzEgNi44ODQ4MyAyMC43ODgzIDkuMTE5OTUgMjMuMDQ0IDExLjU4NjZDMjQuMTI5NiAxMi43ODAxIDI1LjEwMjggMTQuMDg5OSAyNS45NDkgMTUuNDk2MkMyNS44NDc1IDE1LjY2MjcgMjUuNzM1NSAxNS44NDY0IDI1LjYwNzggMTYuMDQ3M0MyNS4wMjE1IDE2Ljk2NTkgMjQuMTU1MyAxOC4xOTA2IDIzLjA0NCAxOS40MDU3QzIwLjc4ODMgMjEuODcyNCAxNy43MDgyIDI0LjEwNzUgMTQgMjQuMTA3NUMxMC4yOSAyNC4xMDc1IDcuMjExNzUgMjEuODcyNCA0Ljk1NiAxOS40MDU3QzMuODcwMzggMTguMjEyMiAyLjg5NzE2IDE2LjkwMjUgMi4wNTEgMTUuNDk2MkgyLjA1Mjc1WiIgZmlsbD0id2hpdGUiLz4NCjxwYXRoIGQ9Ik0xNCAxMC43MTJDMTIuODM5NyAxMC43MTIgMTEuNzI2OSAxMS4yMTYgMTAuOTA2NCAxMi4xMTMyQzEwLjA4NTkgMTMuMDEwNCA5LjYyNSAxNC4yMjcyIDkuNjI1IDE1LjQ5NjFDOS42MjUgMTYuNzY0OSAxMC4wODU5IDE3Ljk4MTcgMTAuOTA2NCAxOC44Nzg5QzExLjcyNjkgMTkuNzc2MSAxMi44Mzk3IDIwLjI4MDIgMTQgMjAuMjgwMkMxNS4xNjAzIDIwLjI4MDIgMTYuMjczMSAxOS43NzYxIDE3LjA5MzYgMTguODc4OUMxNy45MTQxIDE3Ljk4MTcgMTguMzc1IDE2Ljc2NDkgMTguMzc1IDE1LjQ5NjFDMTguMzc1IDE0LjIyNzIgMTcuOTE0MSAxMy4wMTA0IDE3LjA5MzYgMTIuMTEzMkMxNi4yNzMxIDExLjIxNiAxNS4xNjAzIDEwLjcxMiAxNCAxMC43MTJaTTcuODc1IDE1LjQ5NjFDNy44NzUgMTMuNzE5NyA4LjUyMDMxIDEyLjAxNjEgOS42Njg5NyAxMC43NjAxQzEwLjgxNzYgOS41MDM5OSAxMi4zNzU1IDguNzk4MzQgMTQgOC43OTgzNEMxNS42MjQ1IDguNzk4MzQgMTcuMTgyNCA5LjUwMzk5IDE4LjMzMSAxMC43NjAxQzE5LjQ3OTcgMTIuMDE2MSAyMC4xMjUgMTMuNzE5NyAyMC4xMjUgMTUuNDk2MUMyMC4xMjUgMTcuMjcyNCAxOS40Nzk3IDE4Ljk3NiAxOC4zMzEgMjAuMjMyMUMxNy4xODI0IDIxLjQ4ODEgMTUuNjI0NSAyMi4xOTM4IDE0IDIyLjE5MzhDMTIuMzc1NSAyMi4xOTM4IDEwLjgxNzYgMjEuNDg4MSA5LjY2ODk3IDIwLjIzMjFDOC41MjAzMSAxOC45NzYgNy44NzUgMTcuMjcyNCA3Ljg3NSAxNS40OTYxWiIgZmlsbD0id2hpdGUiLz4NCjwvc3ZnPg0K",
    // hide: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyOCAyNSIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNMjMuMzc4MiAxOC42OTI1QzI2LjM1NDkgMTUuNzg3NiAyNy45OTk5IDEyLjQ5NjIgMjcuOTk5OSAxMi40OTYyQzI3Ljk5OTkgMTIuNDk2MiAyMi43NDk5IDEuOTcxMTkgMTMuOTk5OSAxLjk3MTE5QzEyLjMxOTIgMS45Nzc1MiAxMC42NTc1IDIuMzYwNDcgOS4xMTc0MyAzLjA5NjQxTDEwLjQ2NDkgNC41NzE4MkMxMS41OTc5IDQuMTIwNSAxMi43OTQxIDMuODg4MDQgMTMuOTk5OSAzLjg4NDgzQzE3LjcwOTkgMy44ODQ4MyAyMC43ODgyIDYuMTE5OTUgMjMuMDQzOSA4LjU4NjYzQzI0LjEyOTYgOS43ODAxNCAyNS4xMDI4IDExLjA4OTkgMjUuOTQ4OSAxMi40OTYyQzI1Ljg0NzQgMTIuNjYyNyAyNS43MzU0IDEyLjg0NjQgMjUuNjA3NyAxMy4wNDczQzI1LjAyMTQgMTMuOTY1OSAyNC4xNTUyIDE1LjE5MDYgMjMuMDQzOSAxNi40MDU3QzIyLjc1NTIgMTYuNzIxNSAyMi40NTQyIDE3LjAzMzQgMjIuMTM5MiAxNy4zMzU4TDIzLjM3ODIgMTguNjkyNVoiIGZpbGw9IndoaXRlIi8+DQo8cGF0aCBkPSJNMTkuNzY5NiAxNC43NDY1QzIwLjE2MDIgMTMuNTUyMSAyMC4yMzI1IDEyLjI2MSAxOS45NzgyIDExLjAyMzRDMTkuNzIzOSA5Ljc4NTc5IDE5LjE1MzQgOC42NTI2IDE4LjMzMzIgNy43NTU2NkMxNy41MTMgNi44NTg3MyAxNi40NzY3IDYuMjM0OTQgMTUuMzQ0OSA1Ljk1Njg3QzE0LjIxMzEgNS42Nzg3OSAxMy4wMzI0IDUuNzU3ODggMTEuOTQwMSA2LjE4NDkyTDEzLjM4MDQgNy43NTk4NEMxNC4wNTI5IDcuNjU0NTcgMTQuNzM4NyA3LjcyMjAzIDE1LjM4MzIgNy45NTY4N0MxNi4wMjc4IDguMTkxNzEgMTYuNjEzNSA4LjU4NzQ3IDE3LjA5MzkgOS4xMTI4QzE3LjU3NDMgOS42MzgxMyAxNy45MzYyIDEwLjI3ODYgMTguMTUxIDEwLjk4MzRDMTguMzY1NyAxMS42ODgyIDE4LjQyNzQgMTIuNDM4MSAxOC4zMzExIDEzLjE3MzVMMTkuNzY5NiAxNC43NDY1Wk0xNC42MTk0IDE3LjIzMjNMMTYuMDU3OSAxOC44MDUzQzE0Ljk2NTYgMTkuMjMyNCAxMy43ODQ5IDE5LjMxMTUgMTIuNjUzMSAxOS4wMzM0QzExLjUyMTQgMTguNzU1MyAxMC40ODUxIDE4LjEzMTUgOS42NjQ4MiAxNy4yMzQ2QzguODQ0NTkgMTYuMzM3NyA4LjI3NDEzIDE1LjIwNDUgOC4wMTk4NCAxMy45NjY5QzcuNzY1NTUgMTIuNzI5MyA3LjgzNzg3IDExLjQzODEgOC4yMjgzOSAxMC4yNDM3TDkuNjY4NjQgMTEuODE4N0M5LjU3MjM4IDEyLjU1NDEgOS42MzQwNyAxMy4zMDM5IDkuODQ4ODIgMTQuMDA4OEMxMC4wNjM2IDE0LjcxMzYgMTAuNDI1NSAxNS4zNTQgMTAuOTA1OSAxNS44Nzk0QzExLjM4NjMgMTYuNDA0NyAxMS45NzIgMTYuODAwNSAxMi42MTY2IDE3LjAzNTNDMTMuMjYxMSAxNy4yNzAxIDEzLjk0NjggMTcuMzM3NiAxNC42MTk0IDE3LjIzMjNWMTcuMjMyM1oiIGZpbGw9IndoaXRlIi8+DQo8cGF0aCBkPSJNNS44NjI1IDcuNjU0NjZDNS41NDc1IDcuOTYwODQgNS4yNDQ3NSA4LjI3MDg1IDQuOTU2IDguNTg2NkMzLjg3MDM4IDkuNzgwMTEgMi44OTcxNiAxMS4wODk5IDIuMDUxIDEyLjQ5NjJMMi4zOTIyNSAxMy4wNDczQzIuOTc4NSAxMy45NjU4IDMuODQ0NzUgMTUuMTkwNiA0Ljk1NiAxNi40MDU3QzcuMjExNzUgMTguODcyNCAxMC4yOTE3IDIxLjEwNzUgMTQgMjEuMTA3NUMxNS4yNTMgMjEuMTA3NSAxNi40MzI1IDIwLjg1MyAxNy41MzUgMjAuNDE4NkwxOC44ODI1IDIxLjg5NTlDMTcuMzQyNCAyMi42MzE4IDE1LjY4MDcgMjMuMDE0OCAxNCAyMy4wMjExQzUuMjUgMjMuMDIxMSAwIDEyLjQ5NjIgMCAxMi40OTYyQzAgMTIuNDk2MiAxLjY0MzI1IDkuMjAyNzkgNC42MjE3NSA2LjI5OThMNS44NjA3NSA3LjY1NjU3TDUuODYyNSA3LjY1NDY2Wk0yMy44ODA1IDI0LjY1NTRMMi44ODA1IDEuNjkxNzdMNC4xMTk1IDAuMzM2OTE0TDI1LjExOTUgMjMuMzAwNUwyMy44ODA1IDI0LjY1NTRaIiBmaWxsPSJ3aGl0ZSIvPg0KPC9zdmc+DQo="
    hide: "../../../assets/icons/eye-slash.svg",
    show: "../../../assets/icons/eye.svg"
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
    // console.log(this.productService.selectedProduct);
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
