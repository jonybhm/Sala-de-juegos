import { TestBed } from '@angular/core/testing';

import { ProgramacionLinealService } from './programacion-lineal.service';

describe('ProgramacionLinealService', () => {
  let service: ProgramacionLinealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramacionLinealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
