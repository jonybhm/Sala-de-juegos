import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntadosJuegoComponent } from './preguntados-juego.component';

describe('PreguntadosJuegoComponent', () => {
  let component: PreguntadosJuegoComponent;
  let fixture: ComponentFixture<PreguntadosJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreguntadosJuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntadosJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
