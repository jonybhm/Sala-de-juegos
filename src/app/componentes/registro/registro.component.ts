import { Component,signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {Auth, createUserWithEmailAndPassword} from '@angular/fire/auth'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LogoutService } from '../../servicios/logout.service';
import { ErrorService } from '../../servicios/error.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,CommonModule,
    MatSlideToggle,MatButtonModule,MatInputModule,
    MatIconButton,MatFormFieldModule, MatToolbarModule,
    RouterOutlet,RouterLink,RouterLinkActive ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})

export class RegistroComponent {

constructor(
  public auth:Auth,
  private router: Router,
  public logout:LogoutService,
  private error:ErrorService
)
{}

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
    this.error.Toast.fire(
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
        this.error.Toast.fire(
        {
          title:"Email invalido",
          icon:'error'
        })  
      break;
      case "auth/email-already-in-use":
        this.error.Toast.fire(
        {
          title:"Email ya se encuentra en uso",
          icon:'error'
        })  
      break;
      case "auth/invalid-password":
        this.error.Toast.fire(
        {
          title:"Contraseña invalida",
          icon:'error'
        })  
      break;
      case "auth/weak-password":
        this.error.Toast.fire(
        {
          title:"Contraseña muy débil",
          icon:'error'
        })  
      break;        
      default:
        this.error.Toast.fire(
        {
          title:'Error en el registro',
          icon:'error'
        })  
      break;
    }
  });  

}

hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
