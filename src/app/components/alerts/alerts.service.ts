import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DetailArchingRequestService } from 'src/app/controller/detail-arching/detail-arching-request.service';
import { FileProductRequestService } from 'src/app/controller/fileProduct/file-product-request.service';
import { ScannerRequestService } from 'src/app/controller/scanner/scanner-request.service';
import { DetailArching } from 'src/app/entities/detail-arching/detail-arching';
import { FileProduct } from 'src/app/entities/file-product/file-product';
import { ScannerProduct } from 'src/app/entities/scanner-product/scanner-product';
import { FileProductService } from 'src/app/services/file-product-service/file-product.service';
import { ScannerService } from 'src/app/services/scanner-service/scanner.service';
import { Arching } from '../../entities/arching/arching';
import { format, parseISO } from 'date-fns';
import { ArchingRequestService } from 'src/app/controller/arching/arching-request.service';
import { ArchingService } from 'src/app/services/arching-service/arching.service';
import { CodesRequestService } from 'src/app/controller/codes/codes-request.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private alertController: AlertController, private archingRequestService: ArchingRequestService,
    private scannerRequestService: ScannerRequestService, private archingService: ArchingService,
    private scannerService: ScannerService, private fileProductRequestService: FileProductRequestService,
    private fileProductService: FileProductService, private codesRequestService: CodesRequestService,
    private detailArchingRequestService: DetailArchingRequestService) { }

  async enterBack(){
    const alert = await this.alertController.create({
      header: 'Ya ingreso este producto',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Actualizar',
          handler: () => {
            console.log('Actualizar cantidad');
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteScannedProduct(id: number){
    const alert = await this.alertController.create({
      header: '¿Eliminar producto? ',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.scannerRequestService.deleteScannedProduct(id).subscribe(() => {
              console.log('Eliminado');
              this.detailArchingRequestService.deleteDetailArching(id).subscribe(() => {
                this.scannerService.triggerUpdatedListScanned.emit();
              });
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteFileProduct(id: number, fileProduct: FileProduct){
    const alert = await this.alertController.create({
      header: '¿Eliminar producto? ',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            if (!fileProduct.scannedProduct) {
              console.log('Borrado sin scanned');
              this.fileProductRequestService.deletelFileProduct(id).subscribe(data => {
                console.log('Eliminado', data);
                this.fileProductService.triggerUpdatedFileList.emit();
                this.scannerService.triggerUpdatedListScanned.emit();
              });
            } else {
              console.log('Borrado con scanned');
              this.fileProductRequestService.deletelFileAndScannedProduct(id).subscribe((date) => {
                console.log(date);
                this.detailArchingRequestService.deleteDetailArching(fileProduct.scannedProduct.id).subscribe(() => {
                  this.fileProductService.triggerUpdatedFileList.emit();
                  this.scannerService.triggerUpdatedListScanned.emit();
                });
              });
            };
          },
        },
      ],
    });

    await alert.present();
  }

  async fileProductUpdate(fileProduct: FileProduct) {
    const alert = await this.alertController.create({
      header: 'Actualizar cantidad',
      inputs: [
        {
          placeholder: 'Cantidad',
          name: 'amount',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Actualizar',
          handler: (alertData) => {
            fileProduct.amount = alertData.amount;
            this.fileProductRequestService.updateFileProduct(fileProduct.id, fileProduct).subscribe(data => {
              console.log(data);
              const detailArching: DetailArching = {
                id: data.scannedProduct.id,
                fileProductAmount: data.amount,
              };
              this.detailArchingRequestService.updateFileAmountDetailArching(detailArching).subscribe(() => {
                this.scannerService.triggerUpdatedListScanned.emit();
                this.fileProductService.triggerUpdatedFileList.emit();
              });
            });
          },
        },
      ]
    });

    await alert.present();
  }

  async productUpdate(scannedProduct: ScannerProduct) {
    const alert = await this.alertController.create({
      header: 'Actualizar cantidad',
      inputs: [
        {
          placeholder: 'Cantidad',
          name: 'amount',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Actualizar',
          handler: (alertData) => {
            const productUpdated: ScannerProduct = {
              id: scannedProduct.id,
              amount: alertData.amount,
              fileProduct: scannedProduct.fileProduct
            };
            this.scannerRequestService.updateScannedProduct(scannedProduct.id, productUpdated).subscribe(data => {
              const detailArching: DetailArching = {
                id: data.id,
                scannedProductAmount: data.amount,
              };
              this.detailArchingRequestService.updateDetailArching(detailArching).subscribe(() => {
                this.scannerService.triggerUpdatedListScanned.emit();
              });
            });
          },
        },
      ]
    });

    await alert.present();
  }

  async linkedProduct(){
    const alert = await this.alertController.create({
      header: 'Este producto ya esta vinculado con otro',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Actualizar vinculo',
          handler: () => {
            console.log('Actualizar');
          },
        },
      ],
    });

    await alert.present();
  }

  async whitOutCod() {
    const alert = await this.alertController.create({
      header: 'Debe ingresar un codigo',
      subHeader: 'Puede ingresar el codigo manualmente',
      inputs: [
        {
          placeholder: 'Código',
          name: 'cod',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (alertData) => {
            this.scannerService.triggerSendCod.emit(alertData.cod);
          },
        },
      ]
    });

    await alert.present();
  }

  async endLasOneArching(){
    const alert = await this.alertController.create({
      header: 'Arqueo no terminado',
      subHeader: 'Debe terminar el arqueo actual antes de comenzar otro',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Aceptar');
          },
        },
      ],
    });

    await alert.present();
  }

  async closeArching(arching: Arching){
    const alert = await this.alertController.create({
      header: '¿Está seguro que quiere terminar el arqueo?',
      subHeader: 'Si usted presiona “Aceptar” no se podrá dar marcha atrás, el arqueo finalizará y no se podrá modificar nunca más.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            const actualyDate = new Date();
            const archingEndDate: Arching = {
              endDate: format(parseISO(format(actualyDate, 'yyyy-MM-dd')), 'yyyy-MM-dd hh:mm:ss')
            };
            this.archingRequestService.setEndDate(archingEndDate, arching.id).subscribe((data) => {
                console.log(data);
                localStorage.setItem('arching-open', 'false');
            });
            //delete all scanned, file products and codes
            this.codesRequestService.deleteAllFileCodes().subscribe((data) => {
              console.log(data);
              this.fileProductRequestService.deleteAllFileProducts().subscribe((dat) => {
                console.log(dat);
                this.fileProductService.triggerUpdatedFileList.emit();
                this.scannerService.triggerUpdatedListScanned.emit();
                this.codesRequestService.deleteAllCodes().subscribe(async (da) => {
                  console.log(da);
                  this.archingService.triggerReloadActuallyArching.emit();
                });
              });
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async amountNoNumber(amountString: any){
    const alert = await this.alertController.create({
      header: 'Error en cantidad',
      subHeader: 'La cantidad del archivo con la que vinculo no es un número. Usted vínculo con "' + amountString + '"',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Aceptar');
          },
        },
      ],
    });

    await alert.present();
  }

  async fileIncorrect(){
    const alert = await this.alertController.create({
      header: 'Error en la carga del archivo',
      subHeader: 'El archivo ingresado no cumple con los paremetros que se requieren',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Aceptar');
          },
        },
      ],
    });

    await alert.present();
  }

}
