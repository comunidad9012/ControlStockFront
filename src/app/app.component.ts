import { Component, OnInit } from '@angular/core';
import { ArchingRequestService } from './controller/arching/arching-request.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private archingRequestService: ArchingRequestService) {

  }

  async ngOnInit(): Promise<void> {
    await this.getLastOneArching();
  }

  async getLastOneArching(): Promise<void>{
    return await new Promise<void>((resolve, reject) => {
      this.archingRequestService.getLastOneArching().subscribe(data => {
        if (data.endDate === null) {
          localStorage.setItem('arching-open', 'true');
        } else {
          localStorage.setItem('arching-open', 'false');
        }
        resolve();
      });
    });
  }
}
