import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";
import { AngularFireModule } from "@angular/fire/compat";
import {
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR
} from "@angular/fire/compat/firestore";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from "@angular/fire/compat/functions";
import { environment } from "../environments/environment";

import { LazyLoadImageModule } from "ng-lazyload-image";
import { TableModule } from "ngx-easy-table";
import { NgxPayPalModule } from "ngx-paypal";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { StoreComponent } from "./pages/store/store.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { SizingFitComponent } from "./pages/sizing-fit/sizing-fit.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";
import { ShippingAndReturnsComponent } from "./pages/shipping-and-returns/shipping-and-returns.component";
import { ServiceWorkerModule } from "@angular/service-worker";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreComponent,
    NavbarComponent,
    CheckoutComponent,
    AboutUsComponent,
    SizingFitComponent,
    PageNotFoundComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    ShippingAndReturnsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ maxOpened: 4 }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    LazyLoadImageModule,
    FormsModule,
    GoogleMapsModule,
    NgxPayPalModule,
    ReactiveFormsModule,
    TableModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000"
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useValue: () => new Promise(resolve => setTimeout(resolve, 3000)),
      multi: true
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators
        ? ["localhost", 8080]
        : undefined
    },
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.useEmulators
        ? ["localhost", 5001]
        : undefined
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
