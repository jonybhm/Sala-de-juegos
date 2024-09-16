import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, Subscription } from 'rxjs';
import { addDoc,query,collection, Firestore, orderBy, collectionData } from '@angular/fire/firestore';
import {MatTableModule} from '@angular/material/table';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth'
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({

  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,MatSlideToggle,MatButtonModule,MatAutocompleteModule,
    MatInputModule, MatButtonModule, MatIconButton, MatFormFieldModule, MatIconButton, MatTableModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  mailAuto: string="admin@gmail.com";
  claveAuto: string="00000Casa";

  constructor(public auth: Auth, private firestore:Firestore, private router: Router){   
  }
  
  //================REGISTRO USUARIOS NUEVOS================

  Registrar (path:string)
  {
    this.router.navigate([path]);
  }

  
  //================REGISTRO DE LOGINS EN BASE DE DATOS================
  displayedColumns: string[] = ['usuario', 'fecha'];
  loginsCollection: any[] = [];
  countLogins: number = 0;
  private sub!: Subscription;

  registrarLoginsEnDB () 
  {
    let coleccion = collection(this.firestore, 'logins');
    addDoc(coleccion,{
      "Fecha": new Date(), 
      "Usuario":this.usuario
    });
  }

  obtenerDatosLoginsDB ()
  {
    let coleccion = collection(this.firestore, 'logins');

    const filteredQuery = query(
      coleccion,orderBy("Fecha","desc")
    );

    const observable = collectionData(filteredQuery); //canal de comunicacon que me permite ver si hubo cambios en la base de datos 

    this.sub = observable.subscribe((respuesta:any)=>{
      this.loginsCollection = respuesta;
      this.countLogins = this.loginsCollection.length;
      console.log(respuesta);
    })
  }


  //================LOGIN USUARIOS================
  usuario : string = '';
  claveUsuario: string = '';
  usuarioLogeado: string ='';
  errorLogeo: boolean = false;

  IniciarSesion(path: string)
  {
    signInWithEmailAndPassword(this.auth, this.usuario, this.claveUsuario).then((res)=>{
      this.errorLogeo = false;
      this.Toast.fire(
        {
          title:'Inicio de Sesión exitosa',
          icon:'success'
        }
      )
      this.router.navigate([path]);

    }).catch((e) => {
      this.errorLogeo = true;
      console.log(e.code);
      switch(e.code)
      {        
        case "auth/invalid-credential":
          this.Toast.fire(
            {
              title:'Usuario o contraseña invalidos',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        case "auth/invalid-email":
          this.Toast.fire(
            {
              title:'Email invalido',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        case "auth/missing-password":
          this.Toast.fire(
            {
              title:'Falta contraseña',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        default:
          this.Toast.fire(
            {
              title:'Faltan datos',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
      }
    });
  }
  

  //---------------ocultar contraseña---------------

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
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


  limpiarUsuario()
  {
    this.usuario = "";
    this.claveUsuario = "";
  }

  
}
