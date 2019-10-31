import { Component, OnInit } from '@angular/core';
import { AlertService } from '@/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  show = false;
  message = '';

  constructor(public alertService: AlertService) { }

  ngOnInit() {
    this.alertService.subscribe(this.pop.bind(this));
  }

  pop(message) {
    this.message = message;
    this.show = true;
  }

  ok() {
    this.show = false;
    this.message = '';
  }
}
