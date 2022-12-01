import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArchingService {

  @Output() triggerOpenCalendarModal: EventEmitter<any> = new EventEmitter();

  @Output() triggerChangeData: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
