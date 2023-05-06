import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslationService } from 'core/services';

@Component({
  selector: 'del-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'delmar-attalla';

  constructor(private translateService: TranslationService, private titleService: Title) {
    if (this.translateService.isEnglish) {
      this.titleService.setTitle('Delmar & Attalla');
    } else {
      this.titleService.setTitle('موقغ دلمار وعطا لله');
    }
  }
}
