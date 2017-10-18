import { TestBed, inject } from '@angular/core/testing';

import { AngularRazService } from './angular-raz.service';

describe('AngularZarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularRazService]
    });
  });

  it('should be created', inject([AngularRazService], (service: AngularRazService) => {
    expect(service).toBeTruthy();
  }));
});
