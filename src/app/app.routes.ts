import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { AhorcadoJuegoComponent } from './componentes/juegos/ahorcado-juego/ahorcado-juego.component';
import { TransporteJuegoComponent } from './componentes/juegos/transporte-juego/transporte-juego.component';
import { MayorMenorJuegoComponent } from './componentes/juegos/mayor-menor-juego/mayor-menor-juego.component';
import { PreguntadosJuegoComponent } from './componentes/juegos/preguntados-juego/preguntados-juego.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: "full"},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'ahorcado', component: AhorcadoJuegoComponent},
    {path: 'preguntados', component: PreguntadosJuegoComponent},
    {path: 'memoria', component: MayorMenorJuegoComponent},
    {path: 'transporte', component: TransporteJuegoComponent}
];
