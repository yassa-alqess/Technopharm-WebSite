import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[swiperSlide]',
})
export class SlideDirective {
  constructor(public template: TemplateRef<any>) { }
}
