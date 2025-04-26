import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel, IonText, IonFooter, IonButton, IonBadge } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api/api.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: true,
  imports: [IonBadge, IonButton, IonFooter, IonText, 
    IonItem,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonLabel,
    UpperCasePipe,
    RouterLink
  ],
})
// Get's the id of item, and added to bag
export class ItemDetailPage implements OnInit, OnDestroy {
  id!: string;
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController);
  public cartService = inject(CartService)
  addToBag!: any; // * Difference between this, this and this.
  totalItems = 0;
  item: any;
  cartSub!: Subscription;
  constructor() {}

  ngOnInit() {
    this.getItem(); 

    this.cartSub = this.cartService.cart.subscribe({ // * Is cart a variable or function? How does subscribe works?
      next: (cart) => {
        console.log("This is cart:",cart);
        this.totalItems = cart ? cart?.totalItem : 0;
        console.log("Total items:", this.totalItems);
      }
    })
  }
  getItem() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || id == '0') {
      this.navCtrl.back();
      return;
    }
    this.id = id;
    this.item = this.api.items.find((record) => record.id == id);
    console.log(this.item);
  }
  addItem(){
    const result = this.cartService.addQuantity(this.item);
    this.addedText();
  }
  addedText(){
    this.addToBag = 'Added to Bag';
    setTimeout(() => {
      this.addToBag = null;
    }, 1000);
  }
  ngOnDestroy(): void {
    if(this.cartSub) this.cartSub.unsubscribe();
  }
}
