import { Component, OnInit } from '@angular/core';
import { FileProductRequestService } from 'src/app/controller/fileProduct/file-product-request.service';
import { FileProduct } from 'src/app/entities/file-product/file-product';
import { FileProductService } from 'src/app/services/file-product-service/file-product.service';
import { AlertsService } from '../alerts/alerts.service';

@Component({
  selector: 'app-file-product-list',
  templateUrl: './file-product-list.component.html',
  styleUrls: ['./file-product-list.component.scss'],
})
export class FileProductListComponent implements OnInit {

  fileProductList: FileProduct[];
  filterTerm!: string;

  constructor(private fileProductRequestService: FileProductRequestService,
    private alertsService: AlertsService, private fileProductService: FileProductService) {

  }

  ngOnInit() {
    this.getAllFileProducts();
    this.fileProductService.triggerUpdatedFileList.subscribe(() => {
      this.getAllFileProducts();
    });
  }

  getAllFileProducts() {
    this.fileProductRequestService.getAllFileProducts().subscribe(data => {
      this.fileProductList = data;
    });
  }

  deleteProduct(id: number, fileProduct: FileProduct) {
    this.alertsService.deleteFileProduct(id, fileProduct);
    console.log('El id es: ', id);
  }

  productUpdate(fileProduct: FileProduct){
    this.alertsService.fileProductUpdate(fileProduct);
  }


}
