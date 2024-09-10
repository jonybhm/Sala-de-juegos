import { Component } from '@angular/core';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.scss'
})
export class QuienSoyComponent {
  nombre: string = "Jonathan";
  apellido: string = "De Castro";
  imagen: string = "Jonathan";
  descripcionJuego: string = "Basado en el método de transporte de operativa, se basa en un camion llevando cajas de fabricas a depositos.";

}
