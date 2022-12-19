import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ArchingRequestService } from 'src/app/controller/arching/arching-request.service';
import { DetailArchingRequestService } from 'src/app/controller/detail-arching/detail-arching-request.service';
import { DetailArching } from 'src/app/entities/detail-arching/detail-arching';
import { ArchingService } from 'src/app/services/arching-service/arching.service';

@Component({
  selector: 'app-detail-arching',
  templateUrl: './detail-arching.component.html',
  styleUrls: ['./detail-arching.component.scss'],
})
export class DetailArchingComponent implements OnInit, AfterViewInit {

  page = true;
  detailArchingList: DetailArching;

  constructor(private archingService: ArchingService, private detailArchingRequestService: DetailArchingRequestService,
    private archingRequestService: ArchingRequestService) { }

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
    this.archingService.triggerSendArchingId.subscribe((data) => {
      this.getAllDetailArching(data);
    });
  }

  getAllDetailArching(id: number) {
    this.detailArchingRequestService.getAllDetailArching(id).subscribe((data) => {
      this.detailArchingList = data;
    });
  }

  async getLastOneArching(): Promise<void>{
    return await new Promise<void>((resolve, reject) => {
      this.archingRequestService.getLastOneArching().subscribe(data => {
        this.getAllDetailArching(data.id);
        resolve();
      });
    });
  }

}
