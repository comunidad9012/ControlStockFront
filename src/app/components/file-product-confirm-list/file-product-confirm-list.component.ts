import { Component, OnInit } from '@angular/core';
import { CodesRequestService } from 'src/app/controller/codes/codes-request.service';
import { ScannerRequestService } from 'src/app/controller/scanner/scanner-request.service';
import { Codes } from 'src/app/entities/codes/codes';
import { ScannerProduct } from 'src/app/entities/scanner-product/scanner-product';
import { ScannerService } from 'src/app/services/scanner-service/scanner.service';
import { FileProduct } from '../../entities/file-product/file-product';
import { DetailArchingRequestService } from 'src/app/controller/detail-arching/detail-arching-request.service';
import { ArchingRequestService } from 'src/app/controller/arching/arching-request.service';
import { DetailArching } from '../../entities/detail-arching/detail-arching';

@Component({
  selector: 'app-file-product-confirm-list',
  templateUrl: './file-product-confirm-list.component.html',
  styleUrls: ['./file-product-confirm-list.component.scss'],
})
export class FileProductConfirmListComponent implements OnInit {
  isModalOpen = false;
  fileProducts: FileProduct[]; // Almacena lista de FileProducts donde el COD coincida
  allFileProducts: FileProduct[]; // Almacena la lista de todos los FileProducts existentes
  scannerProductAmount: ScannerProduct; // Almacena el amount pasado por ScannedComponent
  filterTerm!: string; // Fitro de busqueda
  chekingBy: boolean; // Almacena si la busqueda solo sera por nombre o por nombre y codigo
  searchby = true; // busqueda por cod o nombre, true === cod
  cod: Codes; // Almacena el codigo
  varNewFileProduct = false;

  constructor(
    private scannerService: ScannerService,
    private codesRequestService: CodesRequestService,
    private scannerRequestService: ScannerRequestService,
    private detailArchingRequestService: DetailArchingRequestService,
    private archingRequestService: ArchingRequestService
  ) {}

  ngOnInit(): void {
    this.scannerService.triggerOpenModal.subscribe((data) => {
      console.log(data);
      this.setOpen();
    });
    // Espera a que se le envie la cantidad y el codigo a relacionar con un ScannedProduct
    this.scannerService.triggerSendScannedProductAmount.subscribe((data) => {
      console.log('Datos entrantes', data.cod, data.amount, data.chekingByValue);
      this.chekingBy = data.chekingByValue;
      if (!this.chekingBy) {
        this.searchby = false;
      }
      this.newFileProduct(false); // Hace que no se muestre el newFileProduct
      this.getAllFileProductsByCodesId(data.cod); // Llama a obtener todos los FileProducts que coincidan con el codigo
      this.cod = {// Almacena el codigo en la variable cod
        id: data.cod
      };
      console.log('El id es',this.cod);
      this.getAllFileProducts(); // Llama a todos los fileProductF
      // Almacena la cantidad a ingresar en scanned product en la variable scannerProductAmount
      this.scannerProductAmount = {
        amount: data.amount
      };
    });
    this.scannerService.triggerSelectItem.subscribe((data) => {
      this.selectItem(data);
    });
  }

  setOpen() {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
    } else {
      this.isModalOpen = false;
    }
  }

  public getAllFileProductsByCodesId(data: string) {
    // Guarda en fileProducts los FileProducts que coincidan con el codigo
    this.codesRequestService
      .getAllFileProductsByCodesId(data)
      .subscribe((requestData) => {
        this.fileProducts = requestData;
      });
  }

  public getAllFileProducts() {
    // LLama a todos los FileProducts y los almacena en allFileProducts
    this.codesRequestService.getAllFileProducts().subscribe((data) => {
      this.allFileProducts = data;
    });
  }

  // Vincula al nuevo scanned product a un file product
  // Si ya estan viculados simplemente actualiza la cantidad de ScannedProduct
  public selectItem(fileProductId: number) {
    this.scannerRequestService
      .newOrUpdateScannedProduct(fileProductId, this.scannerProductAmount)
      .subscribe(
        d => {
          console.log(d);
          if (this.cod.id !== '') {
            this.codesRequestService.addCode(fileProductId, this.cod).subscribe(()=>{});
          }
          // Alta de detailProduct
          const detailArching: DetailArching = {
            id: d.id,
            productName: d.fileProduct.productName,
            mark: d.fileProduct.mark,
            scannedProductAmount: this.scannerProductAmount.amount,
            fileProductAmount: d.fileProduct.amount
          };
          this.archingRequestService.getLastOneArching().subscribe((data) => {
            this.detailArchingRequestService.newDetailArching(data.id, detailArching).subscribe((dat)=>{
              console.log(dat);
            });
          });

          this.scannerRequestService.getAllScannedProduct().subscribe((data) => {
              this.scannerService.triggerUpdatedListScanned.emit(data);
          });
          this.setOpen();
        },
        (err) => {
          console.error('Error', err);
        }
      );
  }

  searchBy() {
    this.newFileProduct(false);
    if (this.searchby) {
      this.searchby = false;
    } else {
      this.searchby = true;
    };
  }

  newFileProduct(value: boolean) {
    if (this.varNewFileProduct === true) {
      this.varNewFileProduct = false;
    } else {
      this.varNewFileProduct = value;
    }
  }
}
