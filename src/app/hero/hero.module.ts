import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { SorryComponent } from './sorry/sorry.component';

@NgModule({
  declarations: [HeroComponent, SorryComponent],
  imports: [
    CommonModule
  ],
  exports: [HeroComponent, SorryComponent]
})
export class HeroModule { }
