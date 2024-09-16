import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {Auth, signOut} from '@angular/fire/auth'
import Swal  from 'sweetalert2';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,MatButtonModule,MatFormFieldModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public auth: Auth, private router:Router){

  }

  //================CERRAR SESION================

  CerrarSesion(path:string)
  {
    signOut(this.auth).then(()=>{
      this.router.navigate([path]);
      this.Toast.fire(
        {
          title:'Ha cerrado sesión',
          icon:'info'
        }
      )
      console.log(this.auth.currentUser?.email)
    }).catch((e)=>console.log(e))
  }

  //================ALERTAS================
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

}
