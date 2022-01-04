import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import scrollIntoView from "scroll-into-view-if-needed";
import { ProductService } from "src/app/services/product.service";

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
      routerLink: "/sizing-and-fit",
      description: "Find out what size fits you best"
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

  constructor(private router: Router, public productService: ProductService) {}

  goToProduct(name: string) {
    let product = document.getElementById(name);
    if (product) {
      this.storeActiveSection = name;
      scrollIntoView(product, {
        // scrollMode: 'if-needed',
        behavior: "smooth"
        // block: 'center',
        // // inline: 'nearest',
      });
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event.url;
        console.log(route);
        setTimeout(() => {
          // navbar + storeNav?
          const storeNav = document.getElementById("nav-fixed");
          const navBlur = document.getElementById("nav-blur");
          if (storeNav) navBlur ? (navBlur.style.height = 160 + "px") : null;
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
          //your code to be executed after 750 milliseconds
          nav?.classList.remove("js-open");
        }, delay);
      }
    });
  }
}
