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
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [

    {path:"",component:AuthLayoutComponent,canActivate:[isLoggedInGuard],children:[
            {path:"",redirectTo:"signin",pathMatch: 'full'},
            {path:"signin",component:SigninComponent},
            {path:"forgotpwd",component:ForgotPasswordComponent},
            {path:"signup",component:SignupComponent},
        ]
    },

    {path:"",component:MainLayoutComponent,canActivate:[authGuard],children:[
        {path:"",redirectTo:"home",pathMatch: 'full'},
        {path:"home",component:HomeComponent,canActivate:[authGuard]},
        {path:"cart",component:CartComponent,canActivate:[authGuard]},
        {path:"wishlist",component:WishlistComponent,canActivate:[authGuard]},
        {path:"categories",component:CategoriesComponent,canActivate:[authGuard]},
        {path:"brands",component:BrandsComponent,canActivate:[authGuard]},
        {path:"products",component:ProductsComponent,canActivate:[authGuard]},
        {path:"orders",component:OrdersComponent,canActivate:[authGuard]},
        {path:"product-details/:id",component:ProductDetailsComponent,canActivate:[authGuard]},
        {path:"shipping-address/:id",component:ShippingAddressComponent,canActivate:[authGuard]},
        {path:"**",component:NotFoundComponent},
    ]
}   

];
