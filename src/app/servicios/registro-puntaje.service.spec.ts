import { TestBed } from '@angular/core/testing';

import { RegistroPuntajeService } from './registro-puntaje.service';

describe('RegistroPuntajeService', () => {
  let service: RegistroPuntajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroPuntajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
