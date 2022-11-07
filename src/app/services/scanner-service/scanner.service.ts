import { EventEmitter, Injectable, Output } from '@angular/core';
import { ScannerProduct } from 'src/app/entities/scanner-product/scanner-product';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  //Envio scanned product amount
  @Output() triggerSendScannedProductAmount: EventEmitter<any> = new EventEmitter();

  //emite la lista de  productos actualizada
  @Output() triggerUpdatedListScanned: EventEmitter<ScannerProduct[]> = new EventEmitter(); //Objeto de la clase EventEmitter

  //hacer cheking by cod o by name
  @Output() triggerCheking: EventEmitter<boolean> = new EventEmitter();

  //select item
  @Output() triggerSelectItem: EventEmitter<any> = new EventEmitter();

  //Send cod
  @Output() triggerSendCod: EventEmitter<string> = new EventEmitter();

  //Open Modal
  @Output() triggerOpenModal: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

}
