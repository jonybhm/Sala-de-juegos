import { Component, OnInit } from '@angular/core';
import { addDoc,query,collection, Firestore, orderBy, collectionData } from '@angular/fire/firestore';
import { LogoutService } from '../../servicios/logout.service';
import { ErrorService } from '../../servicios/error.service';
import { Observable, Subscription } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {Auth, signOut} from '@angular/fire/auth'


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatInputModule, FormsModule,CommonModule,MatButtonModule,MatCardModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  constructor(
    public auth: Auth,
    private firestore:Firestore, 
    public logout:LogoutService,
    private error:ErrorService
  ){}
  
  //================REGISTRO DE CHATS EN BASE DE DATOS================
  
  chat : string ='';
  
  chatsCollection: any[] = [];
  countChats: number = 0;
  private sub!: Subscription;
  
  registrarChatEnDB () 
  {
    let coleccion = collection(this.firestore, 'chats');
    addDoc(coleccion,{
      "Fecha": new Date(), 
      "Chat": this.chat,
      "Usuario":this.auth.currentUser?.email
    });
    this.chat = '';
  }
   
  obtenerChatsDB ()
  {
    let coleccion = collection(this.firestore, 'chats');
    

    const filteredQuery = query(
      coleccion,
      orderBy("Fecha","asc")
    );

    const observable = collectionData(filteredQuery); //canal de comunicacon que me permite ver si hubo cambios en la base de datos 

    this.sub = observable.subscribe((respuesta:any)=>{
      this.chatsCollection = respuesta;
      this.countChats = this.chatsCollection.length;
      console.log(respuesta);
    })
  }
  
  ngOnInit(): void {
    this.obtenerChatsDB();
  }

  obtenerNombreUsuario(email: string): string {
    return email.split('@')[0]; 
  }
}
