import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPopupItemComponent } from './product-popup-item.component';

describe('ProductPopupItemComponent', () => {
  let component: ProductPopupItemComponent;
  let fixture: ComponentFixture<ProductPopupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductPopupItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPopupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
