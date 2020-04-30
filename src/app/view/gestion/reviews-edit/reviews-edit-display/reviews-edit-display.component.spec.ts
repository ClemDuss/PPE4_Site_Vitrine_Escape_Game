import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsEditDisplayComponent } from './reviews-edit-display.component';

describe('ReviewsEditDisplayComponent', () => {
  let component: ReviewsEditDisplayComponent;
  let fixture: ComponentFixture<ReviewsEditDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsEditDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsEditDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
