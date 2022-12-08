/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @angular-eslint/contextual-lifecycle */
import { Injectable, OnInit } from '@angular/core';
import { FileProductRequestService } from 'src/app/controller/fileProduct/file-product-request.service';
import { FileProductBarcode } from 'src/app/entities/file-product/file-product-barcode';
import { FileProductService } from 'src/app/services/file-product-service/file-product.service';
import { FileProduct } from '../../entities/file-product/file-product';
import { Codes } from '../../entities/codes/codes';
import { CodesRequestService } from 'src/app/controller/codes/codes-request.service';

@Injectable({
  providedIn: 'root'
})
export class FileProductServiceService implements OnInit {

  formatedFileProductList:  Array<FileProductBarcode>;
  fileProductList: Array<FileProduct> = [];
  codeList: Array<{}> = [];
  fileProduct: FileProduct;
  code: Codes;


  constructor(private fileProductService: FileProductService, private fileProductRequestService: FileProductRequestService,
    private codesRequestService: CodesRequestService) { }

  ngOnInit() {
    this.fileProductService.triggerFormatedList.subscribe(data => {
      this.formatedFileProductList = data;
      console.log(data);

    });
  }

  addFileProductWithCode(){
    this.formatedFileProductList.forEach(i => {
      this.fileProduct = {
        productName: i.productName,
        mark: i.mark,
        amount: i.amount,
      };
      this.code = {
          id: i.barcode
      };
      this.fileProductRequestService.newFileProduct(this.fileProduct).subscribe(data => {
        this.codesRequestService.addCode(data.id, this.code).subscribe(dat => {
          console.log(dat);
        });
      });
    });
  }

  /*
  createCodeList() {
    this.formatedFileProductList.forEach(i => {
      this.codeList.push({
        productName: i.productName,
        mark: i.mark,
        amount: i.amount,
      });
    });
  }
  */
}
