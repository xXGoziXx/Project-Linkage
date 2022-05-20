import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import scrollIntoView from "scroll-into-view-if-needed";
import { ProductService } from "src/app/services/product.service";
import { Meta, Title } from "@angular/platform-browser";
import { CartIcon, LogoIcon } from "../icons";
declare let gtag: Function;
declare let fbq: Function;
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  PATH = {
    closeToggler: ".toggler-close",
    expandableNav: ".main-nav__expandable",
    navItem: ".main-nav__item",
    openToggler: ".toggler-open"
  };

  LogoIcon = LogoIcon;

  CartIcon = CartIcon;

  pages = [
    {
      title: "Home",
      routerLink: "/home",
      description: "Return to the Home Page"
    },
    {
      title: "Store",
      routerLink: "/store",
      description: "Check out all the latest items"
    },
    {
      title: "Sizing & Fit",
      routerLink: "/sizing-fit",
      description: "Find out what size fits you best"
    },
    {
      title: "Shipping & Returns",
      routerLink: "/shipping-returns",
      description: "Learn more about our shipping process"
    },
    {
      title: "Privacy Policy",
      routerLink: "/privacy-policy",
      description: "Find out how we manage your information"
    },
    {
      title: "About Us",
      routerLink: "/about-us",
      description: "Get to know who we are"
    },
    {
      title: "Contact Us",
      routerLink: "/contact-us",
      description: "Stay up to date through our socials"
    }
  ];
  showStoreNav: boolean = true;
  storeActiveSection = "";
  previousUrl: string | undefined;

  constructor(
    private router: Router,
    public productService: ProductService,
    private meta: Meta,
    private title: Title
  ) {}

  goToProduct(name: string) {
    let product = document.getElementById(name);
    if (product) {
      this.storeActiveSection = name;
      scrollIntoView(product, {
        // scrollMode: 'if-needed',
        behavior: "smooth",
        block: "end"
        // inline: "nearest"
      });
    }
  }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.previousUrl === "/store") {
          this.productService.viewProduct = false;
          this.productService.preview = true;
        }
        const route = event.url;
        gtag("config", "G-B8KC2V92BL", { page_path: route });
        fbq("track", "PageView");
        const page = this.pages.find(page => page.routerLink === route);
        let prefix = "";
        let description = "";
        if (page) {
          description = page.description;
          prefix = page.title + " | ";
        } else if (route === "/checkout") {
          prefix = "Checkout | ";
          description = "Check out what items you've added to your cart";
        }
        this.meta.addTags([
          { name: "description", content: description },
          { name: "author", content: "GT Nventionz" },
          {
            name: "keywords",
            content:
              "Linkage, Anime, Merchandise, Ecommerce, Store, Kage, Ireland, Irish, Clothing, Shopping, Durags, Fleece, Beanies"
          }
        ]);
        document.title = prefix + "Linkage";
        this.previousUrl = route;
        // console.log(route);
        setTimeout(() => {
          // navbar + storeNav?
          const storeNav = document.getElementById("nav-fixed");
          const navBlur = document.getElementById("nav-blur");
          if (storeNav) navBlur ? (navBlur.style.height = 140 + "px") : null;
          else navBlur ? (navBlur.style.height = 80 + "px") : null;
        }, 1);
        if (route === "/store") {
          this.showStoreNav = true;
          if (this.storeActiveSection) {
            setTimeout(() => {
              this.goToProduct(this.storeActiveSection);
            }, 200);
          } else {
            this.storeActiveSection = this.productService.sortBy(
              this.productService.products,
              "order"
            )[0]?.name;
          }
        } else {
          this.showStoreNav = false;
        }
      }
    });
    document.body.addEventListener("click", e => {
      const target = <HTMLElement>e.target;

      if (target?.closest(this.PATH.openToggler)) {
        const nav = document.querySelector(this.PATH.expandableNav);
        nav?.classList.add("js-open");
      }

      if (
        target.closest(this.PATH.closeToggler) ||
        target.closest(".main-nav__link")
      ) {
        let delay = 200;
        if (target.closest(".main-nav__link")) {
          delay = 400;
        }
        setTimeout(() => {
          const nav = document.querySelector(this.PATH.expandableNav);
          nav?.classList.remove("js-open");
        }, delay);
      }
    });
  }
}
