import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero/hero.component';
import { SorryComponent } from './hero/sorry/sorry.component';
import { PagesComponent } from './fadachai/pages/pages.component';
import { PostListComponent } from './fadachai/post-list/post-list.component';
import { LiveListComponent } from './fadachai/live-list/live-list.component';
import { LivePageComponent } from './fadachai/live-page/live-page.component';
import { AutoReplyComponent } from './fadachai/auto-reply/auto-reply.component';
import { VipComponent } from './fadachai/vip/vip.component';

const routes: Routes = [
  { path: 'hero', component: HeroComponent },
  { path: 'sorry', component: SorryComponent },
  { path: 'pages', component: PagesComponent },
  { path: 'post-list', component: PostListComponent },
  { path: 'live-list', component: LiveListComponent },
  { path: 'live-page', component: LivePageComponent },
  { path: 'autoreply', component: AutoReplyComponent },
  { path: 'vip', component: VipComponent },
  {
    path: '',
    redirectTo: '/hero',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/hero',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
