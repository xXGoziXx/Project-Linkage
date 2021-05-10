import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { SizingFitComponent } from './pages/sizing-fit/sizing-fit.component';
import { ProductComponent } from './pages/product/product.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [{
  path: 'home', component: HomeComponent,
  data: { title: 'Home' }

},
{
  path: 'about-us', component: AboutUsComponent,
  data: { title: 'About Us' }
},
{
  path: 'contact-us', component: ContactUsComponent,
  data: { title: 'Contact Us' }
},
{
  path: 'privacy-policy',
  component: PrivacyPolicyComponent,
  data: { title: 'Privacy Policy' }
},
{
  path: 'sizing-fit',
  component: SizingFitComponent,
  data: { title: 'Sizing & Fit' }
},
{
  path: 'product/:id',
  component: ProductComponent,
  data: { title: 'Product' }
},
{
  path: 'checkout',
  component: CheckoutComponent,
  data: { title: 'Checkout' }
},
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{ path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
