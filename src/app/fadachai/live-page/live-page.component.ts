import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FbService } from '@/fb.service';
import { Live, Comment } from '@/types';
import { AlertService } from '@/alert.service';

@Component({
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.css']
})
export class LivePageComponent implements OnInit {

  constructor(public fbService: FbService, public sanitizer: DomSanitizer, public alertService: AlertService
  ) { }
  tab = 'live';

  live: Live;
  iframeSrc: any;
  iframeWidth = '0';
  iframeHeight = '0';
  comments: Array<Comment>;
  filterComments: Array<Comment>;
  commentFilter = '+1';
  commentFilterEdit = '+1';
  replyPost = '購買連結已經私訊給你囉!!';
  replyPostEdit = '購買連結已經私訊給你囉!!';
  replyMessage = 'https://flask-shopping.herokuapp.com/';
  replyMessageEdit = 'https://flask-shopping.herokuapp.com/';

  ngOnInit() {
    this.live = this.fbService.getLive();
    this.comments = [];
    this.filterComments = [];
    this.iframeWidth = this.fbService.formatIframe(this.live.embed_html).width;
    this.iframeHeight = this.fbService.formatIframe(this.live.embed_html).height;
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.fbService.formatIframe(this.live.embed_html).src);
    this.getComments();
  }

  getComments() {
    this.fbService.getLiveComments(this.live.id)
      .then((response: any) => {
        if (response.comments) {
          this.comments = response.comments.data;
          this.filterComment(this.commentFilter);
        }
      }).catch((error) => {

      });
  }

  filterComment(filter: string) {
    this.filterComments = [];
    this.comments.map((comment: Comment) => {
      if (comment.message.indexOf(filter) > -1) {
        this.filterComments.push(comment);
      }
    });
  }

  saveConfig() {
    this.commentFilter = this.commentFilterEdit;
    this.replyPost = this.replyPostEdit;
    this.replyMessage = this.replyMessageEdit;
    this.filterComment(this.commentFilter);
    this.alertService.pop('Save Success');
  }

  cancelConfig() {
    this.commentFilterEdit = this.commentFilter;
    this.replyPostEdit = this.replyPost;
    this.replyMessageEdit = this.replyMessage;
  }

  changeTab(tab: string) {
    this.tab = tab;
    this.cancelConfig();
  }

  reply(comment: Comment) {
    console.log(comment);
    Promise.all([
      this.fbService.replyComment(comment.id, this.replyPost),
      this.fbService.replyMessage(comment.id, this.replyMessage)]
    ).then((res) => {
      comment.replied = true;
    }).catch((error) => {
      console.log(error);
    });
  }
}
