import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arching',
  templateUrl: './arching.page.html',
  styleUrls: ['./arching.page.scss'],
})
export class ArchingPage implements OnInit {

  page = true;

  constructor() {

  }

  ngOnInit() {

  }

  changePage(){
    if (this.page) {
      this.page = false;
    } else {
      this.page = true;
    }
  }

}
