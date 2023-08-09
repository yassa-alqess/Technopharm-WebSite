import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagazineRoutingModule } from './magazine-routing.module';
import { MagazineComponent } from './pages/magazine/magazine.component';

@NgModule({
  declarations: [
    MagazineComponent
  ],
  imports: [
    CommonModule,
    MagazineRoutingModule
  ]
})
export class MagazineModule { }
