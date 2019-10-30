import { Component, OnInit } from '@angular/core';
import { FbService } from '@/fb.service';
import { Router } from '@angular/router';
import { Post } from '@/types';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(public router: Router, public fbservice: FbService) { }

  posts: Array<Post>;

  ngOnInit() {
    this.fbservice.getAccountPost()
      .then((response) => {
        this.posts = response;
      }).catch((error) => {
        console.log(error);
      });
  }

}
