/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileProductService } from '../services/file-product-service/file-product.service';
import { FileProductBarcode } from '../entities/file-product/file-product-barcode';
import { FileProductServiceService } from '../logic/services-logic/file-product-service.service';

@Component({
  selector: 'app-file-product',
  templateUrl: './file-product.page.html',
  styleUrls: ['./file-product.page.scss'],
})
export class FileProductPage implements OnInit {

  customAlertOptions = {
    header: 'Configuracion de archivo',
    subHeader: 'Configure los archivos de productos',
    message: 'Seleccione solo uno',
    translucent: true,
  };

  isOpenForm = false;
  isOpenAsignation = false;
  isOpenList = true;
  fileProductList: Array<{}>;
  formatedFileProductList: Array<FileProductBarcode> = [];
  fileProductNameKeys: Array<string>;

  newValueAsignation!: FormGroup;


  constructor(private fileProductService: FileProductService) {
    this.formul();
   }

  ngOnInit() {
    console.log('hola',this.fileProductList);
    this.fileProductService.triggerFileProductArray.subscribe(data => {
      this.formul();
      this.openAsignation(true);
      this.isOpenAsignation = true;
      this.fileProductList = data;
      this.fileProductNameKeys = Object.keys(this.fileProductList[0]);
    });

  }

  formul() {
    this.newValueAsignation = new FormGroup({
      barcode: new FormControl('', Validators.required),
      productName: new FormControl('', Validators.required),
      mark: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
  }

  addNewValueAsignation() {
    const form = this.newValueAsignation.value;
    const fileProduct: FileProductBarcode = {
      barcode: form.barcode,
      productName: form.productName,
      mark: form.mark,
      amount: form.amount
    };
    //console.log(fileProduct);
    try {
      this.fileProductList.forEach(i => {
        this.formatedFileProductList.push({
          barcode: i[fileProduct.barcode],
          productName: i[fileProduct.productName],
          mark: i[fileProduct.mark],
          amount: i[fileProduct.amount]
        });
      });
      console.log(this.formatedFileProductList);
      this.fileProductService.triggerFormatedList.emit(this.formatedFileProductList);
    } catch (error) {
      console.log(error);
    }
  }

  openNewFrom(value: boolean) {
    this.isOpenList = false;
    this.isOpenAsignation = !value;
    this.isOpenForm = value;
  }

  openAsignation(value: boolean) {
    this.isOpenList = false;
    this.isOpenForm = !value;
    if (this.isOpenAsignation) {
      this.fileProductService.triggerOpenAchiveModule.emit();
    } else {
      if (!this.fileProductList) {
        this.fileProductService.triggerOpenAchiveModule.emit();
      } else {
        this.isOpenAsignation = value;
      }
    }
  }

  openFileProductList(){
    this.isOpenAsignation = false;
    this.isOpenForm = false;
    this.isOpenList = true;
  }
}
