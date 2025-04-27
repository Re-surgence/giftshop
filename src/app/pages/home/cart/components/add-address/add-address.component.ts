import { Component, OnInit, Output } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
  IonButton,
  IonList,
  IonInput,
  IonTextarea,
  IonCol,
  IonRow,
  IonItem,
  IonLabel,
  IonToggle, IonText } from '@ionic/angular/standalone';
import { EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
  standalone: true,
  imports: [IonText, 
    IonToggle,
    IonLabel,
    IonItem,
    IonRow,
    IonCol,
    IonTextarea,
    IonInput,
    IonList,
    IonButton,
    IonIcon,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonContent,
    IonHeader,
    IonToggle,
    ReactiveFormsModule,
  ],
})
export class AddAddressComponent implements OnInit {
  form!: FormGroup;
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.form = new FormGroup({
      pincode: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [Validators.required] }),
      house_no: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      state: new FormControl(null, { validators: [Validators.required] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      save_as: new FormControl(null, { validators: [Validators.required] }),
      landmark: new FormControl(null, { validators: [] }),
      primary: new FormControl(false, { validators: [] }),
    });
  }

  dismiss(data?: any) {
    this.close.emit(data);
  }

  save(){
    
  }
}
