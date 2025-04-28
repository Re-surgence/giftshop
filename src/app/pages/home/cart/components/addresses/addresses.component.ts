import { Component, OnInit } from '@angular/core';
import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonHeader, IonContent, IonRadioGroup, IonList, IonItem, IonLabel, IonRadio } from '@ionic/angular/standalone';
import { EventEmitter } from '@angular/core';
import { Output, Input } from '@angular/core';
@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  standalone: true,
  imports: [IonRadio, IonLabel, IonItem, IonList, IonRadioGroup, IonContent, IonHeader, IonIcon, IonButton, IonButtons, IonTitle, IonToolbar],
})
export class AddressesComponent implements OnInit {

  @Input() addresses: any[] =[];
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  dismiss(data?: any) {
    this.close.emit(data);
  }
}
