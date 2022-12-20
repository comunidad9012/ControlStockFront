import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DetailArchingRequestService } from 'src/app/controller/detail-arching/detail-arching-request.service';
import { FileProductRequestService } from 'src/app/controller/fileProduct/file-product-request.service';
import { ScannerRequestService } from 'src/app/controller/scanner/scanner-request.service';
import { DetailArching } from 'src/app/entities/detail-arching/detail-arching';
import { ScannerProduct } from 'src/app/entities/scanner-product/scanner-product';
import { FileProductService } from 'src/app/services/file-product-service/file-product.service';
import { ScannerService } from 'src/app/services/scanner-service/scanner.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private alertController: AlertController,
    private scannerRequestService: ScannerRequestService,
    private scannerService: ScannerService, private fileProductRequestService: FileProductRequestService,
    private fileProductService: FileProductService,
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

  async deleteFileProduct(id: number, scannedProductId: number){
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
            this.fileProductRequestService.deletelFileProduct(id).subscribe(data => {
              console.log('Eliminado', data);
              this.detailArchingRequestService.deleteDetailArching(scannedProductId).subscribe(() => {
                this.fileProductService.triggerUpdatedFileList.emit();
                this.scannerService.triggerUpdatedListScanned.emit();
              });
            });
          },
        },
      ],
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
          placeholder: 'Codigo',
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

}
