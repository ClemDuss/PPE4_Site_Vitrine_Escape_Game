import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsStarsComponent } from './reviews-stars.component';

describe('ReviewsStarsComponent', () => {
  let component: ReviewsStarsComponent;
  let fixture: ComponentFixture<ReviewsStarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsStarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
