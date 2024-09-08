import { Component } from '@angular/core';

@Component({
  selector: 'app-who-am-i',
  standalone: true,
  imports: [],
  templateUrl: './who-am-i.component.html',
  styleUrl: './who-am-i.component.scss'
})
export class WhoAmIComponent {
  nombre: string = "";
  apellido: string = "";
  imgaen: string = "";
  descripcionJuego: string = "";
}
