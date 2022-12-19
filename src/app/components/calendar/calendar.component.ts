/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { ArchingService } from 'src/app/services/arching-service/arching.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  isModalOpen = false;
  selectedMode = 'date';
  showPicker = false;
  dateValue: string;
  fromOrTo = 0;

  @ViewChild(IonDatetime) datetime: IonDatetime;

  constructor(private archingService: ArchingService) {
  }
  ngOnInit() {
    this.archingService.triggerOpenCalendarModal.subscribe((data) => {
      console.log('Abriendo');
      this.fromOrTo = data.typ;
      this.dateValue = data.setDate;
      console.log(typeof this.dateValue);
      this.setOpen();
    });
  }

  setOpen() {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
    } else {
      this.isModalOpen = false;
    }
  }

  dateChange(value) {
    this.dateValue = value;
    this.archingService.triggerChangeData.emit({
      fromOrTo: this.fromOrTo,
      date: value
    });
    this.showPicker = false;
  }

  close() {
    this.datetime.cancel(true);
    this.setOpen();
  }

  select() {
    this.datetime.confirm(true);
    this.setOpen();
  }
}
