import { TestBed, inject } from '@angular/core/testing';

import { NgbdatefrparserformatterService } from './ngbdatefrparserformatter.service';

describe('NgbdatefrparserformatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbdatefrparserformatterService]
    });
  });

  it('should be created', inject([NgbdatefrparserformatterService], (service: NgbdatefrparserformatterService) => {
    expect(service).toBeTruthy();
  }));
});
