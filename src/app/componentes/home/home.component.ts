import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {Auth, signOut} from '@angular/fire/auth'
import Swal  from 'sweetalert2';
import { addDoc,query,collection, Firestore, orderBy, collectionData } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,MatButtonModule,MatFormFieldModule,MatTableModule,FormsModule,CommonModule,MatSidenavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public auth: Auth, private router:Router, private firestore:Firestore){

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

   //================REGISTRO DE LOGINS EN BASE DE DATOS================
   displayedColumns: string[] = ['usuario', 'fecha'];
   loginsCollection: any[] = [];
   countLogins: number = 0;
   private sub!: Subscription;
 
    
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
