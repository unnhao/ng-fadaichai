import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tethys-ng';

  ngOnInit() {
    (window as any).FB.init({
      appId: '551275962300920',
      cookie: false,
      xfbml: false,
      version: 'v4.0'
    });
  }
}
