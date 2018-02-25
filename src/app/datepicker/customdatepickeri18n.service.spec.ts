import { TestBed, inject } from '@angular/core/testing';

import { Customdatepickeri18nService } from './customdatepickeri18n.service';

describe('Customdatepickeri18nService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Customdatepickeri18nService]
    });
  });

  it('should be created', inject([Customdatepickeri18nService], (service: Customdatepickeri18nService) => {
    expect(service).toBeTruthy();
  }));
});
