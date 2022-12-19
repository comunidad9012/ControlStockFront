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
