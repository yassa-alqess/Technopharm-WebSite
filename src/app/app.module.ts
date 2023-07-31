import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'core/core.module';
import { ErrorInterceptor } from 'core/interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderSpinnerComponent } from "./modules/shared/components/standalone/loader-spinner/loader-spinner.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    LoaderSpinnerComponent
  ]
})
export class AppModule { }
