import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SizingFitComponent } from './pages/sizing-fit/sizing-fit.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreComponent,
    ProductViewComponent,
    NavbarComponent,
    CheckoutComponent,
    AboutUsComponent,
    SizingFitComponent,
    PageNotFoundComponent,
    ContactUsComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
