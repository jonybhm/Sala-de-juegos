import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteJuegoComponent } from './transporte-juego.component';

describe('TransporteJuegoComponent', () => {
  let component: TransporteJuegoComponent;
  let fixture: ComponentFixture<TransporteJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransporteJuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporteJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
