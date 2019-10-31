import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse, Accounts, Account, Post, Live } from './types';
@Injectable({
  providedIn: 'root'
})
export class FbService {

  constructor(public http: HttpClient) { }
  authResponse: AuthResponse;
  accounts: Accounts;
  account: Account;
  posts: Array<Post>;
  lives: Array<Live>;
  live: Live;

  reload() {
    this.getAuth();
    this.getAccounts();
  }

  setAuth(response) {
    localStorage.setItem('authResponse', JSON.stringify(response.authResponse));
    this.getAuth();
  }

  getAuth() {
    const authResponse = localStorage.getItem('authResponse');
    if (authResponse) {
      this.authResponse = JSON.parse(authResponse);
      return this.authResponse;
    }
    return false;
  }

  setAccounts(response) {
    localStorage.setItem('accounts', JSON.stringify(response.accounts));
    this.getAccounts();
  }

  getAccounts(): Accounts {
    const accounts = localStorage.getItem('accounts');
    if (accounts) {
      this.accounts = JSON.parse(accounts);
      return this.accounts;
    }
    return null;
  }

  setAccount(account) {
    localStorage.setItem('account', JSON.stringify(account));
    this.getAccount();
  }

  getAccount(): Account {
    const account = localStorage.getItem('account');
    if (account) {
      this.account = JSON.parse(account);
      return this.account;
    }
    return null;
  }

  getAccountPost(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `https://graph.facebook.com/${this.account.id}?fields=posts&access_token=${this.account.access_token}`;
      this.http.get(url).subscribe((response: any) => {
        this.posts = response.posts.data;
        resolve(this.posts);
      }, (error) => {
        reject(error);
      });
    });
  }
  getAccountLives() {
    return new Promise((resolve, reject) => {
      const url = `https://graph.facebook.com/${this.account.id}?fields=live_videos&access_token=${this.account.access_token}`;
      this.http.get(url).subscribe((response: any) => {
        this.lives = response.live_videos ? response.live_videos.data : [];
        resolve(this.lives);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAccountLiveViewer(id) {
    return new Promise((resolve, reject) => {
      const url = `https://graph.facebook.com/${id}?fields=live_views&access_token=${this.account.access_token}`;
      this.http.get(url).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  setLive(live) {
    this.live = live;
  }

  getLive() {
    return this.live;
  }

  getLiveComments(liveid) {
    return new Promise((resolve, reject) => {
      const url = `https://graph.facebook.com/${liveid}?fields=comments&access_token=${this.account.access_token}`;
      this.http.get(url).subscribe((response: any) => {
        console.log(response);
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  loginFB(): Promise<any> {
    return new Promise((resolve, reject) => {
      (window as any).FB.login((response) => {
        this.setAuth(response);
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  getUserPages(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `https://graph.facebook.com/${this.authResponse.userID}?fields=accounts&access_token=${this.authResponse.accessToken}`;
      this.http.get(url).subscribe((response) => {
        this.setAccounts(response);
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  replyComment(commentid, message) {
    return new Promise((resolve, reject) => {
      const formData: FormData = new FormData();
      const url = `https://graph.facebook.com/v4.0/${commentid}/comments?access_token=${this.account.access_token}`;
      formData.append('message', message);
      formData.append('debug', 'all');
      formData.append('format', 'json');
      formData.append('pretty', '0');
      formData.append('suppress_http_code', '1');
      formData.append('transport', 'cors');
      this.http.post(url, formData).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  replyMessage(commentid, message) {
    return new Promise((resolve, reject) => {
      const formData: FormData = new FormData();
      const url = `https://graph.facebook.com/v4.0/private_replies?access_token=${this.account.access_token}`;
      formData.append('id', commentid);
      formData.append('message', message);
      this.http.post(url, formData).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }


  formatIframe(ifrmaeTag: string): {
    src: string;
    width: string;
    height: string;
  } {
    const iframe = ifrmaeTag;
    const regEx = /(src|width|height)=["']([^"']*)["']/gi;
    const res: {
      src: string;
      width: string;
      height: string;
    } = {
      src: '',
      width: '',
      height: ''
    };
    res.src = iframe.match(regEx)[0].split('src=')[1].slice(1, -1);
    res.width = iframe.match(regEx)[1].split('width=')[1].slice(1, -1);
    res.height = iframe.match(regEx)[2].split('height=')[1].slice(1, -1);
    return res;
  }
}

