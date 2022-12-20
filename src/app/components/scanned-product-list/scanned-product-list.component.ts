import { Component, OnInit } from '@angular/core';
import { ScannerRequestService } from 'src/app/controller/scanner/scanner-request.service';
import { ScannerProduct } from 'src/app/entities/scanner-product/scanner-product';
import { ScannerService } from 'src/app/services/scanner-service/scanner.service';
import { AlertsService } from '../alerts/alerts.service';
import { ArchingService } from 'src/app/services/arching-service/arching.service';

@Component({
  selector: 'app-scanned-product-list',
  templateUrl: './scanned-product-list.component.html',
  styleUrls: ['./scanned-product-list.component.scss'],
})
export class ScannedProductListComponent implements OnInit {

  listProductsScanneds: ScannerProduct[];
  filterTerm!: string;

  constructor(private scannerService: ScannerService,
     private scannerRequestService: ScannerRequestService,
    private alertsService: AlertsService,
    private archingService: ArchingService) {}

  ngOnInit() {
    this.scannerRequestService.getAllScannedProduct().subscribe(data => {
      this.listProductsScanneds = data;
    });
    this.scannerService.triggerUpdatedListScanned.subscribe(() => {
      this.scannerRequestService.getAllScannedProduct().subscribe(requestData => {
        this.listProductsScanneds = requestData;
        this.archingService.triggerReloadActuallyArching.emit();
      });
    });
  }

  deleteProduct(id: number){
    this.alertsService.deleteScannedProduct(id);
  }

  productUpdate(scannedProduct: ScannerProduct){
    this.alertsService.productUpdate(scannedProduct);
  }

}
