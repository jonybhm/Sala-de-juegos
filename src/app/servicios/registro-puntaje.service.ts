import { Injectable } from '@angular/core';
import { addDoc,query,collection, Firestore, orderBy, collectionData } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import {Auth} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class RegistroPuntajeService {

  constructor(public auth: Auth,
    private firestore:Firestore
  ) { }

  
  puntajesCollection: any[] = [];
  countPuntajes: number = 0;
  private sub!: Subscription;
  
  registrarPuntajeEnDB (puntaje:number, juego:string) 
  {
    let coleccion = collection(this.firestore, 'puntajes');
    addDoc(coleccion,{
      "Fecha": new Date(), 
      "Puntaje": puntaje,
      "Juego": juego,
      "Usuario":this.auth.currentUser?.email
    });
    
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
      this.countPuntajes = this.puntajesCollection.length;
      console.log(respuesta);
    })
  }
}
