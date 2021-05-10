import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit, AfterViewInit {
  menuOpen = false;
  basket = false;
  firstMenuOpen = true
  routerNavEnd$
  routes =
    [{
      path: 'home',
      title: 'Home'
    },
    {
      path: 'sizing-fit',
      title: 'Sizing & Fit'
    },
    {
      path: 'contact-us',
      title: 'Contact Us'
    },
    {
      path: 'about-us',
      title: 'About Us'
    },
    {
      path: 'privacy-policy',
      title: 'Privacy Policy'
    }];
  constructor (private router: Router) {
    this.routerNavEnd$ = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(() => {
      this.basket = false;
      this.menuOpen = false;
    })
  }

  ngOnInit (): void {

  }
  ngAfterViewInit (): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const menuContainer = document.getElementById('menuContainer');
    menuContainer?.addEventListener('animationend', () => {
      const hamburger = document.getElementById('animatedHamburger');
      if (this.menuOpen) {
        hamburger?.classList.add('is-active');
        // Allows opacity on hover to continue functioning
        if (hamburger) hamburger.style.pointerEvents = 'auto'
      } else {
        // Allows opacity on hover to work right from the start
        if (hamburger) hamburger.style.pointerEvents = 'none'
      }
    });
  }



  setBasket (val: boolean) {
    this.basket = val;
  }
  hamburgerClickHandler () {
    this.basket = false;
    this.firstMenuOpen = false;
    const menuContainer = document.getElementById('menuContainer');
    this.menuOpen = !this.menuOpen;
    const inAnimation = 'animate__lightSpeedInLeft';
    const outAnimation = 'animate__fadeOutLeftBig';
    if (menuContainer && menuContainer.style.justifyContent !== 'flex-end') menuContainer.style.justifyContent = 'flex-end';
    if (menuContainer && menuContainer.classList.contains('animate__fadeOut')) {
      menuContainer.classList.remove('animate__fadeOut');
    }
    if (this.menuOpen) {
      menuContainer?.classList.add(inAnimation);
      menuContainer?.classList.remove(outAnimation);
    } else {
      const hamburger = document.getElementById('animatedHamburger');
      hamburger?.classList.remove('is-active');
      setTimeout(() => {
        menuContainer?.classList.remove(inAnimation);
        menuContainer?.classList.add(outAnimation);
      }, 500);
    }
  }

  basketClickHandler () {
    this.basket = !this.basket;
    // console.log(this.basket);
  }
}
