/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileProductService } from '../services/file-product-service/file-product.service';
import { FileProductBarcode } from '../entities/file-product/file-product-barcode';
import { FileProduct } from '../entities/file-product/file-product';
import { Codes } from '../entities/codes/codes';
import { FileProductRequestService } from '../controller/fileProduct/file-product-request.service';
import { CodesRequestService } from '../controller/codes/codes-request.service';

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

  codeList: Array<{}> = [];
  fileProduct: FileProduct;
  code: Codes;


  constructor(private fileProductService: FileProductService, private fileProductRequestService: FileProductRequestService,
    private codesRequestService: CodesRequestService) {
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
    this.fileProductService.triggerOpenList.subscribe(() => {
      this.isOpenForm = false;
      this.isOpenAsignation = false;
      this.isOpenList = true;
    });
  }

  formul() {
    this.newValueAsignation = new FormGroup({
      barcode: new FormControl('', Validators.required),
      productName: new FormControl('', Validators.required),
      mark: new FormControl(''),
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
      this.addFileProductWithCode();
      this.fileProductList = null;
    } catch (error) {
      console.log(error);
    }
  }

  addFileProductWithCode(){
    console.log('La lista es: ', this.formatedFileProductList);
    const listFileProdutList: Array<{}> = [];
    this.formatedFileProductList.forEach(async i => {
      this.fileProduct = {
        productName: i.productName,
        mark: i.mark,
        amount: i.amount,
      };
      this.code = {
        id: i.barcode
      };
      listFileProdutList.push({
        fileProduct: this.fileProduct,
        code: this.code
      });
    });
    this.fileProductRequestService.newFileProductsWithCode(listFileProdutList).subscribe(() => {
      this.openFileProductList();
    });
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

  async openFileProductList(){
    this.fileProductService.triggerUpdatedFileList.emit();
    console.log('Despues');
    this.isOpenAsignation = false;
    this.isOpenForm = false;
    this.isOpenList = true;
  }
}
