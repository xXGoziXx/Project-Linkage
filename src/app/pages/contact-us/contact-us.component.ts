import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"]
})
export class ContactUsComponent implements OnInit {
  links = [
    // {
    //   icon: "../../../assets/icons/fb.svg",
    //   title: "Facebook",
    //   url: "https://www.facebook.com/Linkage-111517534088447"
    // },
    {
      icon: "../../../assets/icons/ig.svg",
      title: "Instagram",
      url: "https://www.instagram.com/project_linkage/"
    },
    {
      icon: "../../../assets/icons/tiktok.svg",
      title: "TikTok",
      url: "https://www.tiktok.com/@project_linkage"
    },
    {
      icon: "../../../assets/icons/mail.svg",
      title: "Email",
      url: "mailto:linkage.info.inc@gmail.com"
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
