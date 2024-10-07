import { Component } from '@angular/core';
import { LogoutService } from '../../servicios/logout.service';
import { ErrorService } from '../../servicios/error.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import {Auth} from '@angular/fire/auth'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule,MatCardModule],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.scss'
})
export class QuienSoyComponent {

  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private error:ErrorService,
    
  ){}

  nombre: string = "Jonathan";
  apellido: string = "De Castro";
  informacionPersonal: string = "Desarrollador Full Stack | Python, C#, JavaScript, PHP | Apasionado por la resolución de problemas y el desarrollo de videojuegos con Godot"
  imagen: string = "Jonathan";
  descripcionJuego: string = "Sumar o restar cajas que el camion repartira desde las fábricas. Cada deposito tiene un valor por caja asociado de acuerdo a la fábrica. El objetivos es repartir todas las cajas, al menor costo posible, siempre teniendo en cuenta el numero de paradas determinadas";
}
