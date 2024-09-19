import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
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
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { LogoutService } from '../../servicios/logout.service';
import { ErrorService } from '../../servicios/error.service';

@Component({

  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,
    MatSlideToggle,MatButtonModule,MatAutocompleteModule,
    MatInputModule, MatToolbarModule,MatButtonModule,
    MatIconButton, MatIconModule, MatFormFieldModule,
    MatIconButton, MatTableModule, MatSidenavModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  mailAuto: string="admin@gmail.com";
  claveAuto: string="00000Casa";

  constructor(
    public auth: Auth, 
    private firestore:Firestore, 
    private router: Router,
    public logout:LogoutService,
    private error:ErrorService
  ){}
  
  //================REGISTRO USUARIOS NUEVOS================

  Registrar (path:string)
  {
    this.router.navigate([path]);
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
      this.error.Toast.fire(
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
          this.error.Toast.fire(
            {
              title:'Usuario o contraseña invalidos',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        case "auth/invalid-email":
          this.error.Toast.fire(
            {
              title:'Email invalido',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        case "auth/missing-password":
          this.error.Toast.fire(
            {
              title:'Falta contraseña',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        default:
          this.error.Toast.fire(
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
  
  registrarLoginsEnDB () 
   {
     let coleccion = collection(this.firestore, 'logins');
     addDoc(coleccion,{
       "Fecha": new Date(), 
       "Usuario":this.usuario
     });
   }

  //---------------ocultar contraseña---------------

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  limpiarUsuario()
  {
    this.usuario = "";
    this.claveUsuario = "";
  }

  
}
