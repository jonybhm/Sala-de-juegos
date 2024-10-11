import { Injectable } from '@angular/core';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';
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
   
  
}
