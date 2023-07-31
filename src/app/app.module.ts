import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'core/core.module';
import { ErrorInterceptor } from 'core/interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderSpinnerComponent } from "./modules/shared/components/standalone/loader-spinner/loader-spinner.component";
import { LoadingInterceptor } from 'core/interceptors/loading/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    LoaderSpinnerComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
})
export class AppModule { }
