import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from '../juegos-routing/juegos-routing.module';
import { MayorMenorJuegoComponent } from '../mayor-menor-juego/mayor-menor-juego.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [MayorMenorJuegoComponent],
  imports: [
    CommonModule,JuegosRoutingModule,FormsModule, MatButtonModule, MatCardModule, MatToolbarModule,MatFormFieldModule
  ],
  providers: []
})
export class JuegosModule { }
