import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoJuegoComponent } from '../ahorcado-juego/ahorcado-juego.component';
import { PreguntadosJuegoComponent } from '../preguntados-juego/preguntados-juego.component';
import { MayorMenorJuegoComponent } from '../mayor-menor-juego/mayor-menor-juego.component';
import { TransporteJuegoComponent } from '../transporte-juego/transporte-juego.component';

const routes: Routes = [
  {path: 'ahorcado',component: AhorcadoJuegoComponent},
  {path: 'mayormenor',component: MayorMenorJuegoComponent},
  {path: 'preguntados',component: PreguntadosJuegoComponent},
  {path: 'transporte',component: TransporteJuegoComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class JuegosRoutingModule { }
