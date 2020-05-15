import { TestBed } from '@angular/core/testing';

import { MediasPubliesService } from './medias-publies.service';

describe('MediasPubliesService', () => {
  let service: MediasPubliesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediasPubliesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
