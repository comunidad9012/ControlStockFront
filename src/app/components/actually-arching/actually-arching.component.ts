import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ArchingService } from 'src/app/services/arching-service/arching.service';
import { Arching } from '../../entities/arching/arching';
import { ArchingRequestService } from 'src/app/controller/arching/arching-request.service';
import { format, parseISO } from 'date-fns';
import { CodesRequestService } from 'src/app/controller/codes/codes-request.service';
import { FileProductRequestService } from 'src/app/controller/fileProduct/file-product-request.service';
import { DetailArching } from 'src/app/entities/detail-arching/detail-arching';
import { DetailArchingRequestService } from 'src/app/controller/detail-arching/detail-arching-request.service';

@Component({
  selector: 'app-actually-arching',
  templateUrl: './actually-arching.component.html',
  styleUrls: ['./actually-arching.component.scss'],
})
export class ActuallyArchingComponent implements OnInit, AfterViewInit {

  arching: Arching = {
    id: 0,
    referrer: '',
    startDate: '',
    endDate: '',
    fileProductAmount: 0,
    scannedProductAmount: 0,
    valence: 0
  };
  page = true;
  end = '';
  detailArchingList: DetailArching[] = [];

  constructor(private archingService: ArchingService, private archingRequestService: ArchingRequestService,
    private codesRequestService: CodesRequestService, private fileProductRequestService: FileProductRequestService,
    private detailArchingRequestService: DetailArchingRequestService) {

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

  closeArching(){
    const actualyDate = new Date();
    const archingEndDate: Arching = {
      endDate: format(parseISO(format(actualyDate, 'yyyy-MM-dd')), 'yyyy-MM-dd hh:mm:ss')
    };
    this.archingRequestService.setEndDate(archingEndDate, this.arching.id).subscribe((data) => {
        console.log(data);
        localStorage.setItem('arching-open', 'false');
    });
    //delete all scanned, file products and codes
    this.codesRequestService.deleteAllFileCodes().subscribe((data) => {
      console.log(data);
      this.fileProductRequestService.deleteAllFileProducts().subscribe((dat) => {
        console.log(dat);
        this.codesRequestService.deleteAllCodes().subscribe(async (da) => {
          console.log(da);
          await this.getLastOneArching();
        });
      });
    });
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
