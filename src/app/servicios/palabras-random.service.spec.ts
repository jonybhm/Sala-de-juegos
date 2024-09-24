import { TestBed } from '@angular/core/testing';

import { PalabrasRandomService } from './palabras-random.service';

describe('PalabrasRandomService', () => {
  let service: PalabrasRandomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalabrasRandomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
