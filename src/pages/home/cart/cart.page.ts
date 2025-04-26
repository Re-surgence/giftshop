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
  IonThumbnail,
  IonImg,
  IonText,
  IonCol,
  IonRow,
  IonList,
  IonListHeader,
  IonItemGroup,
  IonFooter, IonModal, IonItemDivider } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { ViewChild } from '@angular/core';
import { CouponComponent } from './components/coupon/coupon.component';
import { Strings } from 'src/app/enum/strings.enum';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonModal, 
    IonFooter,
    IonItemGroup,
    IonListHeader,
    IonList,
    IonRow,
    IonCol,
    IonText,
    IonImg,
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
    DecimalPipe,
    CouponComponent
  ],
})
export class CartPage implements OnInit, OnDestroy {
  @ViewChild('coupon_modal') coupon_modal!: IonModal;
  applyCoupon: boolean = false;
  previous!: string;
  cartSub!: Subscription;
  model: any = null;
  currency = Strings.CURRENCY;
  selectedCoupon!: any;
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
    const route_url = this.router.url;// this.router.url contains the current url.
    const urlParts = route_url.split('/');// Example: For "/home/cart", urlParts becomes ["", "home", "cart"]
    urlParts.pop();// removes last element of the array
    console.log(urlParts);
    this.previous = urlParts.join('/');// ["", "home"] becomes "/home"
    console.log('url', this.previous);
  }
  /* 
    checkUrl() calculates the parent route of the current URL by removing the last segment.
    this.previous now holds the URL of the parent route ("/home"),
    which you might use for navigation (e.g., a “Back” button to return to the HomePage)
  */
  addQuantity(item: any) {
    this.cartService.addQuantity(item);
  }

  subtractQuantity(item: any) {
    this.cartService.subtractQuantity(item);
  }

  closeCouponModal(coupon: any, couponModal: IonModal){
    console.log('coupon data:', coupon);
    if(coupon){
      this.selectedCoupon = coupon;
      this.model.grandTotal -= this.selectedCoupon?.saved;
    }
    couponModal.dismiss();
  }

  removeCoupon(){
    
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
  }
}
