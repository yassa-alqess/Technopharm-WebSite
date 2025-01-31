import { Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translate = inject(TranslateService);
  private rendererFactory = inject(RendererFactory2);

  private defaultLang: string = localStorage.getItem('currentLang') || environment.defaultLang;
  private language = '';

  private renderer: Renderer2;
  private currentLanguage = new BehaviorSubject<string>(this.defaultLang);

  currentLanguage$ = this.currentLanguage.asObservable();

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initLanguage();
  }

  get isEnglish() {
    return this.translate.currentLang === 'en';
  }

  changeLanguage() {
    this.language = this.language === 'en' ? 'ar' : 'en';
    localStorage.setItem('currentLang', this.language);

    this.translate.use(this.language);
    this.handleBasicLogic();
  }

  instant(key: string | string[]) {
    return this.translate.instant(key);
  }

  private initLanguage() {
    const lang = localStorage.getItem('currentLang');

    if (lang) {
      this.language = lang;
    } else {
      this.language = this.defaultLang;
      localStorage.setItem('currentLang', this.language);
    }

    this.translate.use(this.language);
    this.translate.setDefaultLang(this.language);
    this.handleBasicLogic();
  }

  private handleBasicLogic() {
    if (this.language === 'ar') {
      this.renderer.addClass(document.body, 'rtl');
      this.renderer.setAttribute(document.body, 'dir', 'rtl');
      this.currentLanguage.next(this.language);
    } else {
      this.renderer.removeClass(document.body, 'rtl');
      this.renderer.setAttribute(document.body, 'dir', 'ltr');
      this.currentLanguage.next(this.language);
    }
  }
}
