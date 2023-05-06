import { Directive, EventEmitter, Output } from '@angular/core';
import { TranslationService } from 'core/services';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[isEnglish]'
})
export class IsEnglishDirective {

  private destroy$ = new Subject<any>();
  
  @Output() isEnglish = new EventEmitter<any>();
  
  constructor(private translation: TranslationService) { this.getCurrentLanguage() }

  private getCurrentLanguage() {
    this.translation.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe(land => this.isEnglish.emit(land === 'en'));
    setTimeout(() => this.isEnglish.emit(this.translation.isEnglish));
  }

  /* when leaving the component */
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
