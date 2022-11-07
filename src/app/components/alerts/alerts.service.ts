import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ScannerRequestService } from 'src/app/controller/scanner/scanner-request.service';
import { ScannerProduct } from 'src/app/entities/scanner-product/scanner-product';
import { ScannerService } from 'src/app/services/scanner-service/scanner.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private alertController: AlertController,
    private scannerRequestService: ScannerRequestService,
    private scannerService: ScannerService) { }

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
            this.scannerRequestService.deleteScannedProduct(id).subscribe(data => {
              console.log('Eliminado', data);
              this.scannerRequestService.getAllScannedProduct().subscribe(requestData => {
                console.log('Toda la lista es: ', requestData);
                this.scannerService.triggerUpdatedListScanned.emit(requestData);
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
              this.scannerRequestService.getAllScannedProduct().subscribe(returnData => {
                  this.scannerService.triggerUpdatedListScanned.emit(returnData);
                });
              console.log('Producto actualizado', data);
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

}
