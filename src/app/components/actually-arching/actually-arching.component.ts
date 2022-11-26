import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actually-arching',
  templateUrl: './actually-arching.component.html',
  styleUrls: ['./actually-arching.component.scss'],
})
export class ActuallyArchingComponent implements OnInit {
  time = Date.now();
  today = new Date(this.time);
  constructor() { 
      console.log(this.today.toDateString());
  }

  ngOnInit() {}

}
