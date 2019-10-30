import { Component, OnInit } from '@angular/core';
import { FbService } from '@/fb.service';
import { Live } from '@/types';
@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  constructor(public fbService: FbService) { }

  lives: Array<Live>;

  ngOnInit() {
    this.lives = [];
    this.fbService.getAccountLives()
      .then((response: any) => {
        this.lives = response;
        this.lives.map((live: any) => {
          this.getViewer(live.id).then((responselive: any) => {
            live.viewer = responselive.live_views;
          });
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  getViewer(id) {
    return this.fbService.getAccountLiveViewer(id);
  }
}
