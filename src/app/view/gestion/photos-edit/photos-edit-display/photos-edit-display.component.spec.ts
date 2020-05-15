import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosEditDisplayComponent } from './photos-edit-display.component';

describe('PhotosEditDisplayComponent', () => {
  let component: PhotosEditDisplayComponent;
  let fixture: ComponentFixture<PhotosEditDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosEditDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosEditDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
