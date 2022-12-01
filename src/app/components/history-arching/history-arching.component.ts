/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { ArchingService } from 'src/app/services/arching-service/arching.service';

@Component({
  selector: 'app-history-arching',
  templateUrl: './history-arching.component.html',
  styleUrls: ['./history-arching.component.scss'],
})
export class HistoryArchingComponent implements OnInit {

  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  formattedStringFrom = '';
  formattedStringTo = '';

  constructor(private archingService: ArchingService) {
    this.setToday();
  }

  ngOnInit() {
    this.archingService.triggerChangeData.subscribe((data) => {
      if (data.fromOrTo === 1) {
        this.dateFrom = data.date;
        this.formattedStringFrom = format(parseISO(data.date), 'dd-MM-yyyy');
      } else if (data.fromOrTo === 2){
        this.dateTo = data.date;
        this.formattedStringTo = format(parseISO(data.date), 'dd-MM-yyyy');
      }
    });
  }

  setToday() {
    this.dateFrom.setDate(this.dateFrom.getDate() - 5);
    this.formattedStringFrom = format(parseISO(format(this.dateFrom, 'yyyy-MM-dd') + 'T09:00:00.000Z'), 'dd-MM-yyyy');
    this.formattedStringTo = format(parseISO(format(this.dateTo, 'yyyy-MM-dd')+ 'T09:00:00.000Z'), 'dd-MM-yyyy');
  }

  openCalendar(type: number) {
    let date: Date;
    if (type === 1) {
        date = this.dateFrom;
    } else if (type === 2) {
        date = this.dateTo;
    }
    this.archingService.triggerOpenCalendarModal.emit({
      typ: type,
      setDate: date
    });
  }

}
