import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ArchingService } from 'src/app/services/arching-service/arching.service';
import { Arching } from '../../entities/arching/arching';
import { ArchingRequestService } from 'src/app/controller/arching/arching-request.service';
import { DetailArching } from 'src/app/entities/detail-arching/detail-arching';
import { DetailArchingRequestService } from 'src/app/controller/detail-arching/detail-arching-request.service';
import { AlertsService } from '../alerts/alerts.service';

@Component({
  selector: 'app-actually-arching',
  templateUrl: './actually-arching.component.html',
  styleUrls: ['./actually-arching.component.scss'],
})
export class ActuallyArchingComponent implements OnInit, AfterViewInit {

  arching: Arching = {
    id: 0,
    referrer: '',
    name:'',
    startDate: '',
    endDate: '',
    fileProductAmount: 0,
    scannedProductAmount: 0,
    valence: 0
  };
  page = true;
  end = '';
  detailArchingList: DetailArching[] = [];
  filterTerm!: string;

  constructor(private archingService: ArchingService, private archingRequestService: ArchingRequestService,
    private detailArchingRequestService: DetailArchingRequestService,
    private alertsService: AlertsService) {

  }

  async ngOnInit() {
    this.archingService.triggerChangePage.subscribe((data) => {
      console.log(data);
      if (this.page) {
        this.page = false;
      } else {
        this.page = true;
      }
    });

    await this.getLastOneArching();

    this.archingService.triggerReloadActuallyArching.subscribe(async () => {
      await this.getLastOneArching();
    });
  }

  ngAfterViewInit(): void {
    this.archingService.triggerOpenArchingDetail.subscribe(async dat => {
      if (dat.endDate === null) {
        this.end = 'Sin finalizar';
      } else {
        this.end = dat.endDate.substr(0, 10);
      }
      this.arching = {
        id: dat.id,
        referrer: dat.referrer,
        name: dat.name,
        startDate: dat.startDate.substr(0, 10),
        endDate: this.end
      };
      await this.getTotalScannedProductAmount(this.arching.id);
      await this.getTotalFileProductAmount(this.arching.id);
      await this.getTotalValence(this.arching.id);
      console.log('El arching de id es::', this.arching);
      await this.getAllDetailArching(dat.id);
    });
  }

  async getLastOneArching(): Promise<void>{
    return await new Promise<void>((resolve, reject) => {
      this.archingRequestService.getLastOneArching().subscribe(async data => {
        if (data.endDate === null) {
          this.end = 'Sin finalizar';
        } else {
          this.end = data.endDate.substr(0, 10);
        }
        this.arching = {
          id: data.id,
          referrer: data.referrer,
          name: data.name,
          startDate: data.startDate.substr(0, 10),
          endDate: this.end
        };
        await this.getTotalScannedProductAmount(this.arching.id);
        await this.getTotalFileProductAmount(this.arching.id);
        await this.getTotalValence(this.arching.id);
        await this.getAllDetailArching(data.id);
        console.log(this.arching);
        resolve();
      });
    });
  }

  async closeArching(){
    await this.alertsService.closeArching(this.arching);
  }

  async getAllDetailArching(id: number) {
    return await new Promise<void>((resolve, reject) => {
      this.detailArchingRequestService.getAllDetailArching(id).subscribe((data) => {
        this.detailArchingList = data;
        resolve();
      });
    });
  }

  async getTotalScannedProductAmount(id: number) {
    return await new Promise<void>((resolve, reject) => {
      this.archingRequestService.getTotalScannedProductAmount(id).subscribe((data) => {
        console.log(data);
        this.arching.scannedProductAmount = data;
        resolve();
      });
    });
  }

  async getTotalFileProductAmount(id: number) {
    return await new Promise<void>((resolve, reject) => {
      this.archingRequestService.getTotalFileProductAmount(id).subscribe((data) => {
        this.arching.fileProductAmount = data;
        resolve();
      });
    });
  }

  async getTotalValence(id: number) {
    return await new Promise<void>((resolve, reject) => {
      this.archingRequestService.getTotalValence(id).subscribe((data) => {
        this.arching.valence = data;
        resolve();
      });
    });
  }
}
