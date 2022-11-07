import { Component } from '@angular/core';
import { ScannerService } from '../services/scanner-service/scanner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cheking = 'con';
  chekingByValue = true; // "chekingByValue" indica si la busqueda sera con o sin COD. True === con
  // eslint-disable-next-line max-len
  variable = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3355381.863232432!2d-68.53111545!3d-34.7873176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1667088803589!5m2!1ses!2sar';

  constructor(private scannerService: ScannerService){

  }

  // La funcion chenkingBy() se usa para seleccionar si ingresar un producto por codigo o sin codigo
  chekingBy() {
    if (this.chekingByValue) { // El alta de scannedProduct sera con codigo
      this.chekingByValue = false;
      this.cheking = 'sin';
    } else { // El alta de scannedProduct sera sin codigo
      this.chekingByValue = true;
      this.cheking = 'con';
    }
    // Envia a FileProductConfirmListComponent y a SccanerComponent si el alta sera con o sin COD. True o False
    this.scannerService.triggerCheking.emit(this.chekingByValue);
  }

}
