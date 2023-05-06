import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    BaseSharedModule
  ]
})
export class ErrorModule { }
