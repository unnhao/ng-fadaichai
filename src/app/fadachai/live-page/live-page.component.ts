import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FbService } from '@/fb.service';
import { Live } from '@/types';
@Component({
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.css']
})
export class LivePageComponent implements OnInit {

  constructor(public fbService: FbService, public sanitizer: DomSanitizer,
  ) { }
  tab = 'live';

  live: Live;
  iframeSrc: any;
  iframeWidth = '0';
  iframeHeight = '0';

  ngOnInit() {
    this.live = this.fbService.getLive();
    console.log(this.live);
    this.iframeWidth = this.fbService.formatIframe(this.live.embed_html).width;
    this.iframeHeight = this.fbService.formatIframe(this.live.embed_html).height;
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.fbService.formatIframe(this.live.embed_html).src);

  }

  changeTab(tab: string) {
    this.tab = tab;
  }
}
