import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  nombre!: string;
  apellido!: string;
  imagen!: string;
  descripcionJuego!: string;

  nombreUsuario!: string;
  claveUsuario!: string;
}
