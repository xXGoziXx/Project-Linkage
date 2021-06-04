import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, AfterViewInit {
  slideshow: {
    description: string;
    text: string;
    background: string;
    position: string;
  }[];
  carouselInstances!: M.Carousel[];
  scrollSpyInstances!: M.ScrollSpy[];
  materialBoxInstances!: M.Materialbox[];
  constructor () {
    this.slideshow = [
      { description: 'fifth', text: 'black-text', background: 'white', position: 'five' },
      { description: 'sixth', text: 'white-text', background: 'pink', position: 'six' },
      { description: 'seventh', text: 'white-text', background: 'purple', position: 'seven' }
    ]
  }

  ngOnInit (): void {

  }

  ngAfterViewInit (): void {
    const carouselElems = document.querySelectorAll('.carousel');
    const scrollSpyElems = document.querySelectorAll('.scrollspy');
    const materialBoxElems = document.querySelectorAll('.materialboxed');
    if (carouselElems) {
      // console.log(carouselElems);
      this.carouselInstances = M.Carousel.init(carouselElems, {
        fullWidth: true,
        indicators: true
      });
    }
    if (scrollSpyElems) {
      // console.log(scrollSpyElems);
      this.scrollSpyInstances = M.ScrollSpy.init(scrollSpyElems, {
        scrollOffset: 65
      });
    }
    if (materialBoxElems) {
      // console.log(materialBoxElems);
      this.materialBoxInstances = M.Materialbox.init(materialBoxElems);
    }
  }

}
