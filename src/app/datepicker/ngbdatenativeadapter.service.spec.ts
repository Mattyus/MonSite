import { TestBed, inject } from '@angular/core/testing';

import { NgbdatenativeadapterService } from './ngbdatenativeadapter.service';

describe('NgbdatenativeadapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbdatenativeadapterService]
    });
  });

  it('should be created', inject([NgbdatenativeadapterService], (service: NgbdatenativeadapterService) => {
    expect(service).toBeTruthy();
  }));
});
