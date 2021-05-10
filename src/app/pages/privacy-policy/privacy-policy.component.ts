import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as M from "materialize-css";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.sass']
})
export class PrivacyPolicyComponent implements OnInit, AfterViewInit {

  constructor () { }

  ngOnInit (): void {
  }
  ngAfterViewInit (): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

}
