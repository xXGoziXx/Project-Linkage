import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";

@Injectable({
  providedIn: "root"
})
export class PwaService {
  promptEvent: any;
  constructor(private swUpdate: SwUpdate) {
    window.addEventListener("beforeinstallprompt", async (event: any) => {
      this.promptEvent = event;
      this.promptEvent.prompt();
      const { outcome } = await this.promptEvent.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      this.promptEvent = null;
    });
    window.addEventListener("appinstalled", () => {
      // Clear the deferredPrompt so it can be garbage collected
      this.promptEvent = null;
      // Optionally, send analytics event to indicate successful install
      console.log("PWA was installed");
    });
    swUpdate.available.subscribe(event => {
      // if (askUserToUpdate()) {
      window.location.reload();
      // }
    });
  }
}
