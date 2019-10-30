import { Component, OnInit } from '@angular/core';
import { FbService } from '@/fb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(public router: Router, public fbService: FbService) { }
  ngOnInit() {
  }
  onLogin() {
    this.fbService.loginFB()
      .then((response) => {
        console.log(response);
        this.router.navigate(['pages']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
