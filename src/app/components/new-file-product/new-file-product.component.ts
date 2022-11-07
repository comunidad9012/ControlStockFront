import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileProductRequestService } from 'src/app/controller/fileProduct/file-product-request.service';
import { FileProduct } from 'src/app/entities/file-product/file-product';
import { ScannerService } from 'src/app/services/scanner-service/scanner.service';

@Component({
  selector: 'app-new-file-product',
  templateUrl: './new-file-product.component.html',
  styleUrls: ['./new-file-product.component.scss'],
})
export class NewFileProductComponent implements OnInit {

  newFileProdcuctForm!: FormGroup;

  constructor(private fileProductRequestService: FileProductRequestService, private scannerService: ScannerService) {
    this.newFileProdcuctForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      mark: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
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
    this.fileProductRequestService.newFileProduct(fileProduct).subscribe(data => {
      this.scannerService.triggerSelectItem.emit(data.id);
    });
  }

}
