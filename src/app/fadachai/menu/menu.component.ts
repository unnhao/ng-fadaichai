import { Component, OnInit } from '@angular/core';
import { FbService } from '@/fb.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  page = '';
  constructor(public fbService: FbService) { }

  ngOnInit() {
    this.page = this.fbService.getAccount().name;
  }

}
