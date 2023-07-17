import { Component, OnInit } from "@angular/core";
import { ArcService } from "src/app/services/arc.service";
import { CircleLogoImage } from "src/app/components/icons";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  defaultImage = `https://www.atmosair.com/wp-content/themes/atmosair/assets/icons/loading-spinner-white-thin.gif`;
  CircleLogoImage = CircleLogoImage;
  constructor(public arcService: ArcService) {}
  goToArc(name: string) {
    let arc = document.getElementById(name);
    if (arc) {
      arc.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  }

  ngOnInit(): void {}
}
