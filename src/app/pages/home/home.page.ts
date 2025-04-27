import { Component, inject, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonCol,
  IonThumbnail,
  IonImg,
  IonCard,
  IonLabel,
  IonText,
  IonIcon,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonBadge,
} from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api/api.service';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonBadge,
    IonButton,
    IonButtons,
    IonSearchbar,
    IonIcon,
    IonText,
    IonLabel,
    IonImg,
    IonCol,
    IonRow,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonThumbnail,
    IonCard,
    RouterLink,
  ],
})
// Fetching and searching
export class HomePage implements OnDestroy {
  items: any[] = [];
  allItems: any[] = [];
  query!: string;
  totalItems = 0;
  cartSub!: Subscription;
  private api = inject(ApiService); // Private properties (e.g., private api) cannot be accessed in the HTML. That’s why items is public in your HomePage class.
  public cartService = inject(CartService)

  constructor() {}

  ngOnInit() {
    console.log('HomePage initialized');
    this.getItems();

    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        console.log("Cart from home:", cart)
        this.totalItems = cart ? cart?.totalItem : 0;
        console.log("This is total items from howe:", this.totalItems);
      }
    })
    console.log("This is cartSub:", this.cartSub);
  }

  getItems() {
    this.allItems = this.api.items; // <-----(2)
    this.items = [...this.allItems];
  }

  onSearchChange(event: any) { // Updates the search query when the user types in the search bar.
    console.log('This is search'); // There was an error when I did $event and event.detail
    this.query = event.detail.value.toLowerCase(); // Implementing search function when always lower the case
    this.querySearch();
  }
  // any means TypeScript doesn’t know the structure of event, so it won’t complain when you access event.detail.value.

  querySearch() {
    this.items = []; // Okayyy <-----(2)
    if (this.query.length > 0) {
      this.searchItems();
    } else {
      this.items = [...this.allItems];
    }
  }
  searchItems() {
    this.items = this.api.items.filter((item) =>
      item.name.toLowerCase().includes(this.query)
    );
  }
  ngOnDestroy(): void {
    if(this.cartSub) this.cartSub.unsubscribe();
  }
}
/*
Components and Lifecycle Hooks: ngOnInit, ngOnDestroy in pages.

Services and Dependency Injection: inject for ApiService, CartService, StorageServiceService.

RxJS: BehaviorSubject, asObservable(), subscribe in CartService.

Routing: Navigation between HomePage, ItemDetailPage, and CartPage.

Capacitor: Preferences API for persistent storage.

Ionic Components: ion-content, ion-card, ion-badge, etc.

Event Handling: (click), (ionChange) for buttons and inputs.

*/