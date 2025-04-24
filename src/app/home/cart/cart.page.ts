import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonIcon,
  IonCard,
  IonThumbnail, IonImg, IonText, IonCol, IonRow, IonList, IonListHeader, IonItemGroup, IonFooter } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonFooter, IonItemGroup, IonListHeader, IonList, IonRow, IonCol, IonText, IonImg, 
    IonCard,
    IonIcon,
    IonLabel,
    IonItem,
    IonButtons,
    IonBackButton,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonThumbnail,
    DecimalPipe
  ],
})
export class CartPage implements OnInit, OnDestroy {
  previous!: string;
  cartSub!: Subscription;
  model: any = null;
  public cartService = inject(CartService); // * can't use private variables in html
  private router = inject(Router); // * Curly Bracket Class incident

  constructor() {}

  ngOnInit() {
    this.checkUrl();

    // this.cartService.getCart();
    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        this.model = cart;
      },
    });
  }
  // * okay so when checkUrl was not inside ngOnInit and when I refreshed the page
  // * the back button disappeared(It was there initially)
  checkUrl() {
    const route_url = this.router.url;
    const urlParts = route_url.split('/');
    urlParts.pop();
    console.log(urlParts);
    this.previous = urlParts.join('/');
    console.log('url', this.previous);
  }

  addQuantity(item:any){
    this.cartService.addQuantity(item);
  }

  subtractQuantity(item:any){
    this.cartService.subtractQuantity(item);
  }

  ngOnDestroy(): void {
    if(this.cartSub) this.cartSub.unsubscribe();
  }
}
