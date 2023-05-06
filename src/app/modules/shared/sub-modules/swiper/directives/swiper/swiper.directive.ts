import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import Swiper, { SwiperOptions } from "swiper";

@Directive({
  selector: '[delSwiper]',
  standalone: true
})
export class SwiperDirective implements AfterViewInit {

  @Input() config!: SwiperOptions;

  constructor(private el: ElementRef<HTMLElement & { swiper?: Swiper, initialize: () => void }>) { }

  ngAfterViewInit() {
    Object.assign(this.el.nativeElement, this.config);

    this.el.nativeElement.initialize();
  }
}
