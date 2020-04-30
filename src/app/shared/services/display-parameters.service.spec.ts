import { TestBed } from '@angular/core/testing';

import { DisplayParametersService } from './display-parameters.service';

describe('DisplayParametersService', () => {
  let service: DisplayParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
