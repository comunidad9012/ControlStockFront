import { EventEmitter, Injectable, Output } from '@angular/core';
import { Arching } from 'src/app/entities/arching/arching';

@Injectable({
  providedIn: 'root'
})
export class ArchingService {

  @Output() triggerOpenCalendarModal: EventEmitter<any> = new EventEmitter();

  @Output() triggerChangeData: EventEmitter<any> = new EventEmitter();

  @Output() triggerOpenNewArchingModal: EventEmitter<any> = new EventEmitter();

  @Output() triggerOpenArchingDetail: EventEmitter<Arching> = new EventEmitter();

  @Output() triggerChangePage: EventEmitter<any> = new EventEmitter();

  @Output() triggerReloadActuallyArching: EventEmitter<any> = new EventEmitter();


  constructor() { }
}
