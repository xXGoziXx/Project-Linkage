import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit, OnChanges {
  @Input()
  basket = false;
  @Output()
  basketOutput = new EventEmitter();
  firstChange = true;
  constructor () { }

  ngOnInit (): void {
  }
  ngOnChanges (changes: SimpleChanges): void {
    for (let property in changes) {
      if (property === 'basket') {
        // console.log('Previous:', changes[property].previousValue);
        // console.log('Current:', changes[property].currentValue);
        // console.log('firstChange:', changes[property].firstChange);
        this.firstChange = changes[property].firstChange;
        const basketContainer = document.getElementById('basketContainer');
        const basket = document.getElementById('basket');
        if (!this.firstChange) {
          const containerInAnimation = 'animate__fadeIn';
          const containerOutAnimation = 'animate__fadeOut';
          const basketInAnimation = 'animate__fadeInUp';
          const basketOutAnimation = 'animate__zoomOut';
          // Remove initial animation
          basketContainer?.classList.remove('animate__fadeIn');
          basket?.classList.remove('animate__fadeIn');
          if (this.basket) {
            basket?.classList.remove(basketOutAnimation);
            basketContainer?.classList.remove(containerOutAnimation);
            basket?.classList.add(basketInAnimation);
            basketContainer?.classList.add(containerInAnimation);
          } else {
            basket?.classList.remove(basketInAnimation);
            basketContainer?.classList.remove(containerInAnimation);
            basket?.classList.add(basketOutAnimation);
            basketContainer?.classList.add(containerOutAnimation);
          }
        }
      }
    }
  }

  close () {
    this.basketOutput.emit(false);
  }
  backgroundClickHandler (e: MouseEvent) {
    const basketContainer = document.getElementById('basketContainer');
    if (e.target !== basketContainer) {
      return;
    } else {
      this.close();
    }

  }
}
