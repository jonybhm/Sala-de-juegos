import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorMenorJuegoComponent } from './mayor-menor-juego.component';

describe('MayorMenorJuegoComponent', () => {
  let component: MayorMenorJuegoComponent;
  let fixture: ComponentFixture<MayorMenorJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MayorMenorJuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayorMenorJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
