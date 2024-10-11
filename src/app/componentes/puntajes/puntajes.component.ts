import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../servicios/logout.service';
import { ErrorService } from '../../servicios/error.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import {Auth} from '@angular/fire/auth'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroPuntajeService } from '../../servicios/registro-puntaje.service';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-puntajes',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule,MatCardModule,CommonModule,FormsModule,MatDividerModule],
  templateUrl: './puntajes.component.html',
  styleUrl: './puntajes.component.scss'
})
export class PuntajesComponent implements OnInit{
  
  listaJuegos:string[]=[
    "Ahorcado",
    "Preguntados",
    "Transporte",
    "Mayor o Menor",
    "General"
  ];
  puntajesCollection: any[] = [];
  countPuntajes: number = 0;
  private sub!: Subscription;
 
  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private error:ErrorService,
    private firestore:Firestore 
  ){}
  
  ngOnInit(): void {
    this.obtenerPuntajesDB();    
  }

  obtenerPuntajesDB ()
  {
    let coleccion = collection(this.firestore, 'puntajes');   

    const filteredQuery = query(
      coleccion,
      orderBy("Fecha","asc")
    );

    const observable = collectionData(filteredQuery); //canal de comunicacon que me permite ver si hubo cambios en la base de datos 

    this.sub = observable.subscribe((respuesta:any)=>{
      this.puntajesCollection = respuesta;  
      console.log(this.puntajesCollection);
    })

  }

  obtenerNombreUsuario(email: string): string {
    return email.split('@')[0]; 
  }
}
