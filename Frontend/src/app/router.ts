import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/auth/components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/auth/components/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: '',
        loadComponent: () => import('./components/layouts/layouts.component').then(m => m.LayoutsComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'product',
                loadComponent: () => import('./components/products/components/product/product.component').then(m => m.ProductComponent)
            },
            {
                path: 'product/add',
                loadComponent: () => import('./components/products/components/product-add/product-add.component').then(m => m.ProductAddComponent)
            },
            {
                path: 'product/update/:value',
                loadComponent: () => import('./components/products/components/product-update/product-update.component').then(m => m.ProductUpdateComponent)
            },
            {
                path: 'category',
                loadComponent: () => import('./components/category/category.component').then(m => m.CategoryComponent)
            },
            {
                path: "baskets",
                loadComponent: ()=> import("./components/baskets/components/baskets/baskets.component").then(c=> c.BasketsComponent)
            },
            {
                path: "orders",
                loadComponent: ()=> import("./components/orders/components/orders/orders.component").then(c=> c.OrdersComponent)
            }
        ]
    }
];
