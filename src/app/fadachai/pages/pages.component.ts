import { Component, OnInit } from '@angular/core';
import { FbService } from '@/fb.service';
import { Accounts } from '@/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(public router: Router, public fbservice: FbService) { }

  accounts: Accounts;

  ngOnInit() {
    this.fbservice.getUserPages()
      .then((response) => {
        this.accounts = this.fbservice.getAccounts();
      }).catch((error) => {
        console.log(error);
      });
  }

  onPageClick(page) {
    this.fbservice.setAccount(page);
    this.router.navigate(['post-list']);
  }
}
