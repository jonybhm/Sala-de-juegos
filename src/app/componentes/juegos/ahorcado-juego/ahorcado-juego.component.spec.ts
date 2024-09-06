import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoJuegoComponent } from './ahorcado-juego.component';

describe('AhorcadoJuegoComponent', () => {
  let component: AhorcadoJuegoComponent;
  let fixture: ComponentFixture<AhorcadoJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhorcadoJuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhorcadoJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
