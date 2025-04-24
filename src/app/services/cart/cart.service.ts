import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Strings } from 'src/app/enum/strings.enum';
import { StorageServiceService } from '../storage/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  model:any = null;
  total_delivery_charge = 10;
  cartStoreName = Strings.CART_STORAGE;
  currency = Strings.CURRENCY;
  private storage = inject(StorageServiceService);
  private _cart = new BehaviorSubject<any>(null);

  get cart(){
    return this._cart.asObservable();
  }
  constructor() {
    this.initCart();
  }
  async initCart(){
    try{
      const data = await this.storage.getStorage(this.cartStoreName);
      console.log('Cart form storage:', data);
      if (data?.value){
        this.model = JSON.parse(data.value);
      }else{
        this.model = {items: [], totalItem: 0, totalPrice: 0, grandTotal: 0};
      }
      this._cart.next(this.model);
      console.log('Initialized cart:', this.model);
    }catch(error){
      console.error('Error initializing cart:', error);
      this.model = {items:[], totalItem: 0, totalPrice: 0, grandTotal:0}
      this._cart.next(this.model);
    }
  }
  addQuantity(item: any){
    // const data = this._cart.value;
    // const totalItem = (data?.totalItem || 0) + 1;
    // this._cart.next({ totalItem });
    if(this.model){
      const index = this.model.items.findIndex((data: any) => data.id == item.id);
      
      if(index >= 0){
        this.model.items[index].quantity += 1;
      }else{
        const items = [{...item, quantity : 1}]
        this.model.items = items.concat(this.model.items);
      }
    }else{
      this.model = {
        items: [{...item, quantity: 1}],
        totalItem: 0, 
        totalPrice: 0, 
        grandtotal: 0,
      };
    }
    this.calculate();
    this._cart.next(this.model);
    this.saveCart(this.model);
  }
  subtractQuantity(item:any){
    if(this.model){
      const index = this.model.items.findIndex((data: any) => data.id == item.id);
      if(index>=0 && this.model.items[index]?.quantity > 0){
        this.model.items[index].quantity -= 1;
        this.calculate();
        this._cart.next(this.model);
        this.saveCart(this.model);
        return this.model;
      }
    }
    return null;
  }
  calculate(){
    const items = this.model.items.filter((item:any) => item.quantity > 0);
    
    if(items?.length == 0){
      this.clearCart();
      return;
    }
    
    let totalItem = 0;
    let totalPrice = 0;
    for(const element of items){
      totalItem += element.quantity;
      totalPrice += element.price * element.quantity;
    }

    const grandTotal = totalPrice + this.total_delivery_charge;
    console.log("Grand Total:",grandTotal);
    this.model = {
      ...this.model,
      items,
      totalItem, 
      totalPrice,
      total_delivery_charge: this.total_delivery_charge,
      grandTotal
    };
  }
  saveCart(data:any){
    const model = JSON.stringify(data);
    this.storage.setStorage(this.cartStoreName, model);
  }
  clearCart(){
    this.storage.removeStorage(this.cartStoreName);
    this.model = null;
    this._cart.next(null);
  }
  async getCart(){
    if(!this.model){
      await this.initCart();
    }
    return this.model;
  }
}
