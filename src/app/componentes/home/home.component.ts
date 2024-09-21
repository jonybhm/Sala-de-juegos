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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { LogoutService } from '../../servicios/logout.service';
import { ErrorService } from '../../servicios/error.service';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ChatComponent } from '../chat/chat.component';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,RouterLink,RouterLinkActive, MatListModule,
    MatCardModule,MatButtonModule,MatBottomSheetModule,
    MatToolbarModule, MatFormFieldModule,MatTableModule, 
    FormsModule, CommonModule,MatSidenavModule,ChatComponent,MatMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    public auth: Auth,
    private router:Router, 
    private firestore:Firestore,
    public logout:LogoutService,
    private error:ErrorService,
    private _bottomSheet:MatBottomSheet 
  ){}

  abrirChat(): void {
    this._bottomSheet.open(ChatComponent);
  }

  //  //================REGISTRO DE LOGINS EN BASE DE DATOS================
  //  displayedColumns: string[] = ['usuario', 'fecha'];
  //  loginsCollection: any[] = [];
  //  countLogins: number = 0;
  //  private sub!: Subscription;
 
    
  //  obtenerDatosLoginsDB ()
  //  {
  //    let coleccion = collection(this.firestore, 'logins');
     
 
  //    const filteredQuery = query(
  //      coleccion,orderBy("Fecha","desc")
  //    );
 
  //    const observable = collectionData(filteredQuery); //canal de comunicacon que me permite ver si hubo cambios en la base de datos 
 
  //    this.sub = observable.subscribe((respuesta:any)=>{
  //      this.loginsCollection = respuesta;
  //      this.countLogins = this.loginsCollection.length;
  //      console.log(respuesta);
  //    })
  //  }  

}
