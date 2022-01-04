import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Splide } from "@splidejs/splide";
import { Product } from "src/app/interfaces/product";
import { ProductService } from "src/app/services/product.service";
@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.scss"]
})
export class StoreComponent implements OnInit, AfterViewInit {
  // defaultImage = `https://www.jobesports.com/images/loading_spinner.gif`;
  defaultImage = `https://www.atmosair.com/wp-content/themes/atmosair/assets/icons/loading-spinner-white-thin.gif`;
  selectedProduct: Product = {
    description: `Fire, Lightning, Earth, Water and Wind (火雷土水風) are the five kanji symbols used at the back of the fleece. They represent the five Kage with a quote paraphrased from Itachi about being "acknowledged by the people" when you're someone who can lead a nation.`,
    price: 34.99,
    images: [
      {
        alt: "",
        order: 0,
        src: "https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Durags%2FBlack%20Durag%2FBLACK%20ANIME%20IRISH%20CLOTHING%20OTAKU%20WEEB%20IRELAND%20FAN.png?alt=media&token=c97a192a-f4c0-42a9-b8a4-30e2ecaef7ec"
      },
      {
        alt: "",
        order: 1,
        src: "https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Fleeces%2FBlack%20Fleece%2FANIME%20NARUTO%20CLOTHING%20IRISH%20WEEABOO%20OTAKU%20IRELAND%20BRAND.png?alt=media&token=70ddc23a-ec2e-447c-abe7-057d1284448c"
      },
      { alt: "", order: 2, src: this.defaultImage }
    ],
    name: "Red Fleece",
    order: 0,
    sizes: []
    // sizes: ["S", "M", "L", "XL"]
  };
  0: {
    alt: "";
    src: "https://firebasestorage.googleapis.com/v0/b/pr…dia&token=bc95dc1e-f52d-4fc4-b165-b192670f39f9";
    order: 0;
  };
  previewButtonIcon = {
    show: "../../../assets/icons/eye.svg",
    hide: "../../../assets/icons/eye-slash.svg"
  };
  preview = true;
  showProductCard = false;

  constructor(public productService: ProductService) {}
  get selectedProductFirstImage() {
    return this.selectedProduct.images.filter(image => !image.order)[0];
  }
  get selectedProductSizes() {
    return this.selectedProduct.sizes.join(" / ");
  }

  set viewProduct(value: boolean) {
    this.showProductCard = value;
    if (this.showProductCard) {
      setTimeout(() => {
        this.preview = true;
        const cardContainer = document.getElementById("card-container");

        if (cardContainer) {
          cardContainer?.addEventListener("click", e => {
            if (e.target !== e.currentTarget) return;
            this.viewProduct = false;
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
  showMe(value: any) {
    console.log(value);
    this.selectedProduct = value;
  }
  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", () => {
      // this.viewProduct = true;
    });
  }
  ngAfterViewInit(): void {}
}
