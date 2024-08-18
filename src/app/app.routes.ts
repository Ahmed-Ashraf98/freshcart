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

export const routes: Routes = [

    {path:"",component:AuthLayoutComponent,children:[
            {path:"",redirectTo:"signin",pathMatch: 'full'},
            {path:"signin",component:SigninComponent},
            {path:"signup",component:SignupComponent},
        ]
    },

    {path:"",component:MainLayoutComponent,children:[
        {path:"",redirectTo:"home",pathMatch: 'full'},
        {path:"home",component:HomeComponent},
        {path:"cart",component:CartComponent},
        {path:"categories",component:CategoriesComponent},
        {path:"brands",component:BrandsComponent},
        {path:"products",component:ProductsComponent},
        {path:"orders",component:OrdersComponent},
        {path:"product-details",component:ProductDetailsComponent},
        {path:"**",component:NotFoundComponent},
    ]
}   

];
