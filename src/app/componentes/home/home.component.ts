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
 

}
