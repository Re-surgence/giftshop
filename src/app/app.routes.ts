import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    children: [
      {
        path:'',
        loadComponent: () => import('./pages/home/home.page').then((m)=> m.HomePage)
      },
      {
        path: 'gifts/:id',
        // In Angular’s routing, the : in :id indicates that id is a route parameter—a placeholder for a dynamic value that will be provided when the route is accessed.(variable bhannu khojeko)
        children:[
          {
            path:'',
            loadComponent: () => import('./pages/home/item-detail/item-detail.page').then( m => m.ItemDetailPage)
          },
          {
            path: 'cart',
            loadComponent: () => import('./pages/home/cart/cart.page').then( m => m.CartPage)
          },
        ],
        loadComponent: () => import('./pages/home/item-detail/item-detail.page').then( m => m.ItemDetailPage)
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/home/cart/cart.page').then( m => m.CartPage)
      },
    ],
  },
];
