import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit, AfterViewInit {
  menuOpen = false;
  constructor () { }

  ngOnInit (): void {
  }
  ngAfterViewInit (): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // const that = this;
    const menuContainer = document.getElementById('menuContainer');
    if (menuContainer) {
    }
    menuContainer?.addEventListener('animationend', () => {
      // menuContainer.classList.toggle('animate__animated');
      // menuContainer.classList.toggle('animate__lightSpeedInLeft');
      const hamburger = document.getElementById('animatedHamburger');
      if (this.menuOpen) {
        hamburger?.classList.add('is-active');
      }
    });
    menuContainer?.addEventListener('', () => {
      // menuContainer.classList.toggle('animate__animated');
      // menuContainer.classList.toggle('animate__lightSpeedInLeft');
      const hamburger = document.getElementById('animatedHamburger');
      if (!this.menuOpen) {
      }
    });


  }

  hamburgerClickHandler (e: MouseEvent) {
    const element = e.currentTarget as HTMLElement;
    const menuContainer = document.getElementById('menuContainer');
    this.menuOpen = !this.menuOpen;
    const inAnimation = 'animate__lightSpeedInLeft';
    const outAnimation = 'animate__fadeOutLeftBig';
    if (menuContainer && menuContainer.style.justifyContent !== 'flex-end') menuContainer.style.justifyContent = 'flex-end';
    if (menuContainer && menuContainer.classList.contains('fadeOut')) {
      menuContainer.classList.remove('fadeOut');
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
}
