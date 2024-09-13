import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,MatSlideToggle,MatButtonModule, MatInputModule, MatButtonModule, MatIconButton, MatFormFieldModule, MatIconButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario : string = 'admin';
  contrasena : string = '00000';
  usuarioEncontrado !: string;
  contrasenaEncontrada !: string;
  arrayUsuarios = [
    {nombreUsuario:'admin',claveUsuario:'00000'},
  ]
  
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

  constructor(private router: Router)
  {    
  }

  presioarBotonIngresar(path: string)
  {
    
    this.validarUsuarioContrasena(path);
  }

  validarUsuarioContrasena(path:string)
  {
    this.usuarioEncontrado = String(this.arrayUsuarios.find(user => user.nombreUsuario === this.usuario)?.nombreUsuario);
    this.contrasenaEncontrada = String(this.arrayUsuarios.find(user => user.claveUsuario === this.contrasena)?.claveUsuario);

    console.log(this.usuarioEncontrado);
    console.log(this.contrasenaEncontrada);
       
    if(this.usuarioEncontrado === undefined || this.contrasenaEncontrada === undefined )
    {
      this.faltaUsuario();    
      this.limpiarUsuario();
    }
    else if (this.usuarioEncontrado === this.usuario && this.contrasenaEncontrada === this.contrasena)
    {
      this.bienvenidoUsuario();    
      this.router.navigate([path]);  
      this.limpiarUsuario();
    }  
    else
    {
      this.errorUsuario();
      this.limpiarUsuario();
    }
  }

  errorUsuario()
  {
    this.Toast.fire(
      {
        title:'Usuario o contrasena invalidos',
        text:'Ingrese los datos nuevamente',
        icon:'error'
      }
    )
  }

  faltaUsuario()
  {
    this.Toast.fire(
      {
        title:'Falta algun dato',
        text:'Ingrese los datos nuevamente',
        icon:'warning'
      }
    )
  }

  bienvenidoUsuario()
  {
    this.Toast.fire(
      {
        title:'Bienvenido!',
        text:'Bienvenido a la sala de juegos',
        icon:'success'
      }
    )
  }

  limpiarUsuario()
  {
    this.usuario = "";
    this.contrasena = "";
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
