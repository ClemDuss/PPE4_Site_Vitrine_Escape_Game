import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackMenuButtonComponent } from './back-menu-button.component';

describe('BackMenuButtonComponent', () => {
  let component: BackMenuButtonComponent;
  let fixture: ComponentFixture<BackMenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackMenuButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
