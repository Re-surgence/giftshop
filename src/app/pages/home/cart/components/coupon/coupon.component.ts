import { DecimalPipe, NgClass, NgStyle } from '@angular/common';
import { Component, inject, Input, OnInit, Output } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonButton,
  IonIcon, IonText, IonButtons, IonGrid, IonSpinner } from '@ionic/angular/standalone';
import { Strings } from 'src/app/enum/strings.enum';
import { ApiService } from 'src/app/services/api/api.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
  standalone: true,
  imports: [IonSpinner, IonGrid, IonButtons, IonText, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonRow,
    IonCol,
    IonLabel,
    IonItem,
    IonButton,
    IonIcon,
    NgClass,
    DecimalPipe
  ],
})
export class CouponComponent implements OnInit {
  @Input() orderTotal!:number; // A decorator that allows a parent component to pass data to a child component.
  @Output() close: EventEmitter<any> = new EventEmitter(); // A decorator that allows a child component to emit events to the parent.
  coupons: any[] = [];
  isLoading: boolean = false;
  currency = Strings.CURRENCY;
  private apiService = inject(ApiService);
  constructor() {}

  ngOnInit() {
    this.getCoupons();
  }
  
  async getCoupons(){
    try{
      this.isLoading = true;
      const coupons =this.apiService.getCoupons();
      if(coupons.length > 0){
        coupons.map((coupon) => {
          coupon.saved = this.getSavedAmount(coupon);
          return coupon;
        });
        console.log("Coupons:", coupons);
        this.coupons = [...coupons];
      }
      this.isLoading = false;
    }catch(e){
      this.isLoading = false;
      console.log(e);
    }
  }
  
  getSavedAmount(coupon: any){
    let amt = 0;
    if(coupon?.minimumOrderAmount){
      amt = this.orderTotal - coupon.minimumOrderAmount;
      if (amt < 0) return amt;
      amt = coupon?.isPercentage
      ? this.orderTotal * (coupon?.discount/ 100)
      : coupon.discount;
      if (coupon?.upto_discount){
        console.log('check amt:', amt);
        amt = amt >= coupon.upto_discount ? coupon.upto_discount : amt;
      }
    }
    return amt;
  }

  closeModal(data?: any){
    this.close.emit(data);
  }

}
