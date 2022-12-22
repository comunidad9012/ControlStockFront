/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { ArchingRequestService } from 'src/app/controller/arching/arching-request.service';
import { ArchingService } from 'src/app/services/arching-service/arching.service';
import { Arching } from '../../entities/arching/arching';
import { DateRange } from '../../entities/arching/date-range';

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
  desde = '';
  hasta = '';
  archingList: Arching[] = [];
  page = false;
  filterTerm!: string;

  constructor(private archingService: ArchingService, private archingRequestService: ArchingRequestService) {


  }

  ngOnInit() {
    this.archingService.triggerChangePage.subscribe((data) => {
      console.log(data);
      if (this.page) {
        this.page = false;
      } else {
        this.page = true;
      }
    });

    this.setToday();
    this.getArchingByDate();
    this.archingService.triggerChangeData.subscribe((data) => {
      if (data.fromOrTo === 1) {
        this.dateFrom = data.date;
        this.formattedStringFrom = format(parseISO(data.date), 'yyyy-MM-dd');
        this.desde = format(parseISO(data.date), 'yyyy-MM-dd hh:mm:ss');
      } else if (data.fromOrTo === 2){
        this.dateTo = data.date;
        this.formattedStringTo = format(parseISO(data.date), 'yyyy-MM-dd');
        this.hasta = format(parseISO(data.date), 'yyyy-MM-dd hh:mm:ss');
      }
      this.getArchingByDate();
    });
    this.archingService.triggerReloadActuallyArching.subscribe(()=> {
      this.getArchingByDate();
    });
  }

  setToday() {
    this.dateFrom.setDate(this.dateFrom.getDate() - 60);
    this.formattedStringFrom = format(parseISO(format(this.dateFrom, 'yyyy-MM-dd')), 'yyyy-MM-dd');
    this.formattedStringTo = format(parseISO(format(this.dateTo, 'yyyy-MM-dd')), 'yyyy-MM-dd');
    this.desde = format(parseISO(format(this.dateFrom, 'yyyy-MM-dd')), 'yyyy-MM-dd hh:ss:mm');
    this.hasta = format(parseISO(format(this.dateTo, 'yyyy-MM-dd')), 'yyyy-MM-dd hh:ss:mm');
  }

  openCalendar(type: number) {
    let date: string;
    if (type === 1) {
        date = this.formattedStringFrom;
    } else if (type === 2) {
        date = this.formattedStringTo;
    }
    this.archingService.triggerOpenCalendarModal.emit({
      typ: type,
      setDate: date
    });
  }

  getAllArching() {
    this.archingRequestService.getAllArching().subscribe(data => {
      this.archingList = data;
    });
  }

  getArchingByDate(){
    const dateRange: DateRange = {
      from: this.desde,
      to: this.hasta
    };
    this.archingRequestService.getArchingByDate(dateRange).subscribe(async data => {
      this.archingList = data;
      console.log('Lista1', this.archingList);
      const lista: Array<Arching> = [];
      await new Promise<void>((resolve, reject) => {
        this.archingList.forEach(async i => {
          const file = await this.getTotalFileProductAmount(i.id);
          const scann = await this.getTotalScannedProductAmount(i.id);
          const valence1 = await this.getTotalValence(i.id);
          let end = '';
          if (i.endDate === null) {
            end = 'Sin finalizar';
          } else {
            end = i.endDate.substr(0, 10);
          }
          lista.push({
            id: i.id,
            referrer: i.referrer,
            name: i.name,
            startDate: i.startDate.substr(0, 10),
            endDate: end,
            fileProductAmount: file,
            scannedProductAmount: scann,
            valence: valence1
          });
          resolve();
        });
        console.log('La lista es: ', lista);
        this.archingList = lista;
        console.log('Lista2', this.archingList);
      });
    });
  }

  openArchingDetail(id: number){
    this.archingRequestService.getArchingById(id).subscribe(dat => {
      this.archingService.triggerOpenArchingDetail.emit(dat);
    });
  }

  async getTotalFileProductAmount(id: number) {
    return await new Promise<number>((resolve, reject) => {
      this.archingRequestService.getTotalFileProductAmount(id).subscribe((data) => resolve(data));
    });
  }

  async getTotalScannedProductAmount(id: number) {
    return await new Promise<number>((resolve, reject) => {
      this.archingRequestService.getTotalScannedProductAmount(id).subscribe((data) => resolve(data));
    });
  }

  async getTotalValence(id: number) {
    return await new Promise<number>((resolve, reject) => {
      this.archingRequestService.getTotalValence(id).subscribe((data) => resolve(data));
    });
  }
}
