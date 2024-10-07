import { Component, OnInit , OnDestroy,} from '@angular/core';
import { CartasService } from '../../../servicios/cartas.service';
import { Subscribable, Subscription } from 'rxjs';
import { LogoutService } from '../../../servicios/logout.service';
import { Auth } from '@angular/fire/auth';
import { PalabrasRandomService } from '../../../servicios/palabras-random.service';
import { RegistroPuntajeService } from '../../../servicios/registro-puntaje.service';

@Component({
  selector: 'app-ahorcado-juego',
  templateUrl: './ahorcado-juego.component.html',
  styleUrl: './ahorcado-juego.component.scss'
})
export class AhorcadoJuegoComponent implements OnInit,OnDestroy {

  palabraActual: any;
  palabraPrevia: any;
  palabraDivididaEnCaracteres: any[] =[];
  letrasAdivinadas: boolean[] = [];
  teclaPresionada:string[] = [];
  sub!: Subscription;
  puntajeActual:number = 0;
  intentos:number = 10;
  errores:number = 0 ;
  respuestaCorrecta: boolean = false;
  juegoPerdido:boolean = false;  
  palabraTerminada:boolean = false;

  constructor(
    public auth: Auth,
    private palabras: PalabrasRandomService,
    public logout:LogoutService,
    public registroPuntaje:RegistroPuntajeService
  )
  {}

  ngOnInit(): void
  {
    this.iniciarJuego();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  

  iniciarJuego()
  {
    this.puntajeActual = 0;
    this.intentos = 10;
    this.errores = 0;
    this.juegoPerdido = false;
    this.palabraTerminada = false;
    this.teclaPresionada = [];
    this.generarNuevaPalabra();    
  }

  siguientePalabra()
  {
    this.intentos = 10;
    this.errores = 0;
    this.juegoPerdido = false;
    this.palabraTerminada = false;
    this.teclaPresionada = [];
    this.generarNuevaPalabra();
  }
  
  generarNuevaPalabra()
  {
    this.sub = this.palabras.randomizarPalabra().subscribe(palabraRandom => {
      this.palabraActual = String(palabraRandom).toUpperCase();
      this.palabraDivididaEnCaracteres= this.palabraActual.split('');
      this.letrasAdivinadas = Array(this.palabraDivididaEnCaracteres.length).fill(false);
      console.log(this.palabraActual);
      console.log(this.palabraDivididaEnCaracteres);
    });
  }


  detectarLetraTeclado(datoTecla: string)
  {
    this.respuestaCorrecta = false;
    this.teclaPresionada.push(datoTecla);   

    this.palabraDivididaEnCaracteres.forEach((letra, index) => {
      if(letra === datoTecla) 
      {
        this.letrasAdivinadas[index] = true;
        this.puntajeActual +=1;
        this.respuestaCorrecta = true;
      }      
    });

    if(this.letrasAdivinadas.every((valor) => valor === true))
    {
      console.log(this.letrasAdivinadas);
      this.palabraTerminada = true;
    }

    if(!this.respuestaCorrecta)
    {
      this.intentos -=1;      
      this.errores +=1;
    }

    if(this.intentos === 0)
    {
      this.juegoPerdido = true;
      this.registroPuntaje.registrarPuntajeEnDB(this.puntajeActual,"Ahorcado");
    }
  }

  inhabilitarTecla(datoTecla: string)
  {
    return this.teclaPresionada.includes(datoTecla);
  }

  generarRango(cantidad: number): number[] 
  {
    let rango = Array.from({ length: cantidad }, (_, index) => index);
    console.log(rango)
    return rango;
  }
}

