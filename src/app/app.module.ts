import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule } from 'ng-lazyload-image';

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
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { ShippingAndReturnsComponent } from './pages/shipping-and-returns/shipping-and-returns.component';
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
    PrivacyPolicyComponent,
    ShippingAndReturnsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    LazyLoadImageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
