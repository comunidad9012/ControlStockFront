import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { ArchingRequestService } from 'src/app/controller/arching/arching-request.service';
import { Arching } from 'src/app/entities/arching/arching';
import { ArchingService } from 'src/app/services/arching-service/arching.service';

@Component({
  selector: 'app-new-arching',
  templateUrl: './new-arching.component.html',
  styleUrls: ['./new-arching.component.scss'],
})
export class NewArchingComponent implements OnInit {

  newArching!: FormGroup;
  isModalOpen = false;

  constructor(private archingRequestService: ArchingRequestService, private archingService: ArchingService) {
    this.newArching = new FormGroup({
      referrer: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
   }

  ngOnInit() {
    this.archingService.triggerOpenNewArchingModal.subscribe(() => {
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

  saveArching(){
    const form = this.newArching.value;
    const actualyDate = new Date();
    const arching: Arching = {
      referrer: form.referrer,
      name: form.name,
      startDate: format(parseISO(format(actualyDate, 'yyyy-MM-dd')), 'yyyy-MM-dd hh:mm:ss')
    };
    console.log('La hora es: ', arching.startDate);
    this.archingRequestService.newArching(arching).subscribe((status)=> {
      console.log(status);
      localStorage.setItem('arching-open', 'true');
      this.archingService.triggerReloadActuallyArching.emit();
      this.setOpen();
    });
  }

}
