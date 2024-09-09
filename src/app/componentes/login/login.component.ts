import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
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
    Swal.fire(
      {
        title:'Usuario o contrasena invalidos',
        text:'Ingrese los datos nuevamente',
        icon:'error'
      }
    )
  }

  faltaUsuario()
  {
    Swal.fire(
      {
        title:'Falta algun dato',
        text:'Ingrese los datos nuevamente',
        icon:'error'
      }
    )
  }

  bienvenidoUsuario()
  {
    Swal.fire(
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
}
