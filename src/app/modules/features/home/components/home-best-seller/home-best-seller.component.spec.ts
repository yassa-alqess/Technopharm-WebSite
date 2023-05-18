import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBestSellerComponent } from './home-best-seller.component';

describe('HomeBestSellerComponent', () => {
  let component: HomeBestSellerComponent;
  let fixture: ComponentFixture<HomeBestSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBestSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBestSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
