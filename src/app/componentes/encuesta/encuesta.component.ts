import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule  } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Auth, signOut} from '@angular/fire/auth'
import { LogoutService } from '../../servicios/logout.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [MatToolbarModule, MatFormFieldModule, MatButtonModule, MatInputModule, CommonModule, 
    MatSelectModule, MatSliderModule,MatButtonToggleModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent implements OnInit{

  juegosLista: string[] = ["Ahorcados","Preguntados","Transporte","Mayor o Menor"];
  caracteristicasLista: string[] = ["Ingenio","Facilidad","Reto","Originalidad"];

  form!: FormGroup;

  constructor(public auth: Auth,    public logout:LogoutService,
  ){}

  ngOnInit(): void 
  {
    this.form = new FormGroup({
      nombre: new FormControl('',[Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      apellido: new FormControl('',[Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      edad: new FormControl('',[Validators.min(19),Validators.max(99),Validators.required]),
      telefono: new FormControl('',[Validators.pattern('^[0-9]+$'),Validators.maxLength(10),Validators.required]),
      juegoFavorito: new FormControl('',[Validators.required]),
      nivelGusto: new FormControl('',[Validators.required]),
      caracteristicasJuego: new FormControl('',[Validators.required]),       
    }
  )
  }

  get nombre() 
  {
    return this.form.get('nombre');
  }
  get apellido() 
  {
    return this.form.get('apellido');
  }
  get telefono() 
  {
    return this.form.get('telefono');
  }
  get edad() 
  {
    return this.form.get('edad');
  }
  get juegoFavorito() 
  {
    return this.form.get('juegoFavorito');
  }
  get nivelGusto(){
    return this.form.get('nivelGusto');
  }
  get caracteristicasJuego() 
  {
    return this.form.get('caracteristicasJuego');
  }
  enviarForm()
  {
    if(this.form.valid)
    {
      console.log(this.form.value);
    }
    else
    {
      console.log("no es valido")
    }
  }
}
