import { Component } from '@angular/core';
import { TranslationService } from 'core/services';
import { environment } from '../../../../../../../environments/environment';


@Component({
  selector: 'del-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent {
  isEnglish = true;
  mobileAppDiscountPercentage = environment.mobileAppDiscountPercentage;
  mobileAppURL = environment.mobileAppURL;
  hotLine = environment.hotLine;

  constructor(private translationService: TranslationService) {}

  changeLang() {
    this.translationService.changeLanguage();
  }
}
