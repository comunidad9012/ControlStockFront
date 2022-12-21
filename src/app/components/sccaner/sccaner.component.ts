/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewChecked, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {IonInput} from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ScannerProduct } from 'src/app/entities/scanner-product/scanner-product';
import { ScannerService } from 'src/app/services/scanner-service/scanner.service';
import { AlertsService } from '../alerts/alerts.service';


@Component({
  selector: 'app-sccaner',
  templateUrl: './sccaner.component.html',
  styleUrls: ['./sccaner.component.scss'],
})
//Clase que sirve para hacer el alta con o sin COD
export class SccanerComponent implements OnInit, AfterViewChecked {
  cod = ''; // Código de escaneo
  chekingByValue = true; // Indica si la busqueda sera con o sin COD. True === con
  productForm!: FormGroup;
  // Variables para el foco de amount
  focusIsSet!: boolean; //Inicia como falso
  @ViewChild('amountInput', { static: false }) amountInput!: IonInput;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private scannerService: ScannerService,
    private alertsService: AlertsService
  ) {
    this.productForm = new FormGroup({
      amount: new FormControl(''), // Inicia vacio sin valor por default
    });
  }

  // Se ejecuta cada vez que Angular detecta un cambio en la vista del componente y al inicio
  ngAfterViewChecked(): void {
    if (!this.focusIsSet) {
      // Si focusIsSet es falso le da el foco al amountInput
      this.amountInput.setFocus();

      setTimeout(() => {
        this.focusIsSet = true;
      }, 1000); // Luego de un segundo cambia this.focusIsSet a verdero
    }
  }

  // Se ejecuta solo una vez despues del contructor
  ngOnInit(): void {
    // Queda a la escucha de cambios en chekingByValue de HomePage
    this.scannerService.triggerCheking.subscribe((data) => {
      this.chekingByValue = data;
    });
    this.scannerService.triggerSendCod.subscribe((data) => {
      this.cod = data;
    });
  }

  scan() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.cod = barcodeData.text;
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  pushProduct() {
    this.scannerService.triggerOpenModal.emit(true);
    if (!this.chekingByValue) {
      this.cod = '';
    }
    // Trae los valores del formulario amount
    const form = this.productForm.value;
    if (!form.amount) {
      // Si el amount === null entonces le pone 1 como default
      form.amount = 1;
    }
    // Convierte el valor del form amount en un objeto del tipo ScannerProduct
    const scannerProduct: ScannerProduct = {
      amount: form.amount,
    };

    // Envia a FileProductConfirmListComponent el codigo y la catidad
    this.scannerService.triggerSendScannedProductAmount.emit({
      cod: this.cod,
      amount: scannerProduct.amount,
      chekingByValue: this.chekingByValue,
    });

    this.setDefaultValue();
  }

  setDefaultValue() {
    //vuelve al imput amount vacio devuelta
    this.productForm.setValue({
      amount: '',
    });
  }

  // Es usada por el html
  presentAlert(){
    this.alertsService.whitOutCod();
  }
}
