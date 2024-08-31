import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';

export const routes: Routes = [

    {path:"",component:AuthLayoutComponent,canActivate:[isLoggedInGuard],children:[
            {path:"",redirectTo:"signin",pathMatch: 'full'},
            {path:"signin",component:SigninComponent},
            {path:"signup",component:SignupComponent},
        ]
    },

    {path:"",component:MainLayoutComponent,canActivate:[authGuard],children:[
        {path:"",redirectTo:"home",pathMatch: 'full'},
        {path:"home",component:HomeComponent},
        {path:"cart",component:CartComponent},
        {path:"categories",component:CategoriesComponent},
        {path:"brands",component:BrandsComponent},
        {path:"products",component:ProductsComponent},
        {path:"orders",component:OrdersComponent},
        {path:"product-details/:id",component:ProductDetailsComponent},
        {path:"shipping-address/:id",component:ShippingAddressComponent},
        {path:"**",component:NotFoundComponent},
    ]
}   

];
