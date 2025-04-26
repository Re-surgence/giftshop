import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  setStorage(key:string, value:string){
    Preferences.set({key:key, value:value});
  }
  getStorage(key: string){// retrieves the saved cart data from Preferences
    return Preferences.get({key:key});
  }
  removeStorage(key:string){
    Preferences.remove({key:key});
  }
  clearStorage(){
    Preferences.clear();
  }
}
