import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoJuegoComponent } from '../ahorcado-juego/ahorcado-juego.component';
import { PreguntadosJuegoComponent } from '../preguntados-juego/preguntados-juego.component';
import { MayorMenorJuegoComponent } from '../mayor-menor-juego/mayor-menor-juego.component';
import { TransporteJuegoComponent } from '../transporte-juego/transporte-juego.component';
import { authGuard } from '../../../guards/auth.guard';
const routes: Routes = [
  {path: 'ahorcado',component: AhorcadoJuegoComponent, canActivate: [authGuard]},
  {path: 'mayormenor',component: MayorMenorJuegoComponent, canActivate: [authGuard]},
  {path: 'preguntados',component: PreguntadosJuegoComponent, canActivate: [authGuard]},
  {path: 'transporte',component: TransporteJuegoComponent, canActivate: [authGuard]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class JuegosRoutingModule { }
