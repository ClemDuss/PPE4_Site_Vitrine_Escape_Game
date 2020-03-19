import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsEditComponent } from './reviews-edit.component';

describe('ReviewsEditComponent', () => {
  let component: ReviewsEditComponent;
  let fixture: ComponentFixture<ReviewsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
