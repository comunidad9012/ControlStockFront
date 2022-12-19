import { Component, OnInit } from '@angular/core';
import { ArchingService } from '../services/arching-service/arching.service';
import { ArchingRequestService } from '../controller/arching/arching-request.service';
import { AlertsService } from '../components/alerts/alerts.service';

@Component({
  selector: 'app-arching',
  templateUrl: './arching.page.html',
  styleUrls: ['./arching.page.scss'],
})
export class ArchingPage implements OnInit {

  page = true;

  constructor(private archingService: ArchingService, private archingRequestService: ArchingRequestService,
    private alertsService: AlertsService) {

  }

  ngOnInit() {
    this.archingService.triggerOpenArchingDetail.subscribe(() => {
      this.changePage();
    });
  }

  changePage(){
    if (this.page) {
      this.page = false;
      this.archingService.triggerChangePage.emit(false);
    } else {
      this.page = true;
      this.archingService.triggerChangePage.emit(true);
    }
  }

  openModal(){
    this.archingRequestService.getLastOneArching().subscribe(async (data) => {
      if (data.endDate === null) {
        await this.alertsService.endLasOneArching();
      } else {
        this.archingService.triggerOpenNewArchingModal.emit();
      }
    });
  }

}
