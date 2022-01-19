import { Component } from "@angular/core";
import { PwaService } from "./services/pwa-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Project-Linkage";
  constructor(private pwaService: PwaService) {}
}
