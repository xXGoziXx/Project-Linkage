import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.routing';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { NavComponent } from './components/nav/nav.component';
import { BasketComponent } from './components/basket/basket.component';
import { SizingFitComponent } from './pages/sizing-fit/sizing-fit.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    CheckoutComponent,
    ContactUsComponent,
    HomeComponent,
    ProductComponent,
    NavComponent,
    BasketComponent,
    SizingFitComponent,
    PrivacyPolicyComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
