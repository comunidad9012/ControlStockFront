import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileProductService {

  @Output() triggerFileProductArray: EventEmitter<any> = new EventEmitter();

  @Output() triggerOpenAchiveModule: EventEmitter<any> = new EventEmitter();

  @Output() triggerUpdatedFileList: EventEmitter<any> = new EventEmitter();

  @Output() triggerFormatedList: EventEmitter<any> = new EventEmitter();

  @Output() triggerOpenList: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
