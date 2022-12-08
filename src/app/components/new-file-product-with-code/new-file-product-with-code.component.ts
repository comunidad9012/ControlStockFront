import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CodesRequestService } from 'src/app/controller/codes/codes-request.service';
import { FileProductRequestService } from 'src/app/controller/fileProduct/file-product-request.service';
import { Codes } from 'src/app/entities/codes/codes';
import { FileProduct } from '../../entities/file-product/file-product';

@Component({
  selector: 'app-new-file-product-with-code',
  templateUrl: './new-file-product-with-code.component.html',
  styleUrls: ['./new-file-product-with-code.component.scss'],
})
export class NewFileProductWithCodeComponent implements OnInit {

  newFileProdcuctForm!: FormGroup;

  constructor(private fileProductRequestService: FileProductRequestService, private codesRequestService: CodesRequestService) {
    this.newFileProdcuctForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      mark: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      barcode: new FormControl('', Validators.required)
    });
 }

  ngOnInit() {}

  saveFileProduct() {
    const form = this.newFileProdcuctForm.value;
    const fileProduct: FileProduct = {
      productName: form.productName,
      mark: form.mark,
      amount: form.amount
    };
    const code: Codes = {
      id: form.barcode
    };
    this.fileProductRequestService.newFileProduct(fileProduct).subscribe(data => {
      this.codesRequestService.addCode(fileProduct.id, code).subscribe(dat => {
        console.log(dat);
      });
      console.log(data);

    });
  }

}
