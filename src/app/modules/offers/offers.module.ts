import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './pages/offers/offers.component';
import { OffersRoutingModule } from './offers-routing.module';



@NgModule({
  declarations: [
    OffersComponent
  ],
  imports: [
    CommonModule,
    OffersRoutingModule
  ]
})
export class OffersModule { }
