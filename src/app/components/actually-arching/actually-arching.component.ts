import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ArchingService } from 'src/app/services/arching-service/arching.service';
import { Arching } from '../../entities/arching/arching';
import { ArchingRequestService } from 'src/app/controller/arching/arching-request.service';
import { format, parseISO } from 'date-fns';
import { CodesRequestService } from 'src/app/controller/codes/codes-request.service';
import { FileProductRequestService } from 'src/app/controller/fileProduct/file-product-request.service';

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
    endDate: ''
  };
  page = true;
  end = '';

  constructor(private archingService: ArchingService, private archingRequestService: ArchingRequestService,
    private codesRequestService: CodesRequestService, private fileProductRequestService: FileProductRequestService) {

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

  }

  ngAfterViewInit(): void {
    this.archingService.triggerOpenArchingDetail.subscribe(dat => {
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
      console.log('El arching de id es::', this.arching);
    });
  }


  async getLastOneArching(): Promise<void>{
    return await new Promise<void>((resolve, reject) => {
      this.archingRequestService.getLastOneArching().subscribe(data => {
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
    this.fileProductRequestService.deleteAllFileProducts().subscribe((data) => {
      console.log(data);
    });
    this.codesRequestService.deleteAllCodes().subscribe((data) => {
      console.log(data);
    });
  }


}
