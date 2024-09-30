import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from '../juegos-routing/juegos-routing.module';
import { MayorMenorJuegoComponent } from '../mayor-menor-juego/mayor-menor-juego.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AhorcadoJuegoComponent } from '../ahorcado-juego/ahorcado-juego.component';
import { TransporteJuegoComponent } from '../transporte-juego/transporte-juego.component';
import { MatTableModule } from '@angular/material/table';
import { PreguntadosJuegoComponent } from '../preguntados-juego/preguntados-juego.component';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [MayorMenorJuegoComponent,AhorcadoJuegoComponent, TransporteJuegoComponent, PreguntadosJuegoComponent],
  imports: [
    CommonModule,JuegosRoutingModule,FormsModule, MatButtonModule, MatTableModule,
    MatCardModule, MatToolbarModule,MatFormFieldModule, RouterLink, RouterLinkActive,MatRadioModule
  ],
  providers: []
})
export class JuegosModule { }
