import { Component,signal } from '@angular/core';
import Swal  from 'sweetalert2';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {Auth, createUserWithEmailAndPassword} from '@angular/fire/auth'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,CommonModule,MatSlideToggle,MatButtonModule,MatInputModule,MatIconButton,MatFormFieldModule,
    RouterOutlet,RouterLink,RouterLinkActive ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

constructor(public auth:Auth,private router: Router){

}

//================REGISTRO USUARIOS NUEVOS================


usuarioNuevo: string = "";
claveUsuarioNueva: string = "";

usuarioLogeado: string = "";
errorLogeo: boolean = false;


RegistrarUsuariosNuevos()
{
  createUserWithEmailAndPassword(this.auth, this.usuarioNuevo, this.claveUsuarioNueva).then((res) => {
    if(res.user.email !== null) this.usuarioLogeado = res.user.email;
    this.errorLogeo = false;
    this.Toast.fire(
      {
        title:'Usuario creado con éxito',
        icon:'success'
      }
    )
    this.router.navigate(['/home']);
  }).catch((e) => {
    this.errorLogeo = true;

    switch(e.code)
    {
      case "auth/invalid-email":
        this.errorRegistro("Email invalido");
        break;
      case "auth/invalid-email-already-in-use":
        this.errorRegistro("Email ya se encuentra en uso");
        break;
      case "auth/weak-password":
        this.errorRegistro("Contraseña muy débil");
        break;        
      default:
        this.errorRegistro(e.code);
        break;
    }
  });  

}

Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

errorRegistro(mensaje:string)
{
  this.Toast.fire(
    {
      title: mensaje,
      text:'Ingrese los datos nuevamente',
      icon:'error'
    }
  )
}

hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
