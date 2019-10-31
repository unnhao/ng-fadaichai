import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { InfoComponent } from './info/info.component';
import { PostListComponent } from './post-list/post-list.component';
import { MenuComponent } from './menu/menu.component';
import { LiveListComponent } from './live-list/live-list.component';
import { LivePageComponent } from './live-page/live-page.component';
import { AutoReplyComponent } from './auto-reply/auto-reply.component';
import { AppRoutingModule } from '../app-routing.module';
import { VipComponent } from './vip/vip.component';



@NgModule({
  declarations: [PagesComponent, InfoComponent, PostListComponent, MenuComponent, LiveListComponent, LivePageComponent, AutoReplyComponent, VipComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ]
})
export class FadachaiModule { }
