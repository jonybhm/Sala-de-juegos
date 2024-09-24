import { Component , OnInit , OnDestroy, inject, Injectable} from '@angular/core';
import { CartasService } from '../../../servicios/cartas.service';
import { Subscribable, Subscription } from 'rxjs';
import { LogoutService } from '../../../servicios/logout.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-mayor-menor-juego',
  templateUrl: './mayor-menor-juego.component.html',
  styleUrl: './mayor-menor-juego.component.scss'
})

export class MayorMenorJuegoComponent implements OnDestroy,OnInit{
  
  cartaActual: any;
  cartaPrevia: any;
  mazoActual: any;
  mazoId: string = "";
  sub!: Subscription;
  puntajeActual:number = 0;
  apuestaCorrecta: boolean = false;
  juegoPerdido:boolean = false;
  puntajeFinal:number = 0;

  constructor(
    public auth: Auth,
    private cartas: CartasService,
    public logout:LogoutService,
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
    this.juegoPerdido = false;

    this.sub = this.cartas.robarCartaMazo('new').subscribe(mazoNuevoMezclado => {
      this.mazoActual = mazoNuevoMezclado;
      this.mazoId = this.mazoActual.deck_id;
      this.cartaActual = this.mazoActual.cards[0];
      console.log(this.cartaActual);
    });
  }
  
  robarCarta(eleccionMayorMenor: string)
  {
    this.cartaPrevia = this.cartaActual;

    this.sub = this.cartas.robarCartaMazo(this.mazoId).subscribe(mazo => {
      this.mazoActual = mazo;
      this.cartaActual = this.mazoActual.cards[0];
      console.log(this.cartaActual);
      this.jugarMayorMenor(eleccionMayorMenor);
    });

  }

  jugarMayorMenor(eleccionMayorMenor: string)
  {
    const valorCartaPrevia = this.obtenerValorNumerico(this.cartaPrevia.value);
    const valorCartaActual = this.obtenerValorNumerico(this.cartaActual.value);

    switch(eleccionMayorMenor)
    {
      case 'mayor':
        if(valorCartaPrevia < valorCartaActual)
        {          
          // console.log(valorCartaPrevia);
          // console.log(valorCartaActual);
          this.apuestaCorrecta = true;
        }
      break;
      case 'menor':
        if(valorCartaPrevia > valorCartaActual)
          {
            this.apuestaCorrecta = true;
          }  
      break;
      case 'igual':
        if(valorCartaPrevia === valorCartaActual)
          {            
            this.apuestaCorrecta = true;
          }  
      break;
    }
    if(this.apuestaCorrecta)
    {
      this.puntajeActual+=1;
      this.apuestaCorrecta = false;
    }
    else
    {
      this.puntajeFinal = this.puntajeActual;
      this.puntajeActual = 0;
      this.juegoPerdido = true;
      this.sub.unsubscribe();
    }
  }

  obtenerValorNumerico(valorCarta: string): number {
    let valorNumerico:number;
    switch(valorCarta) 
    {
      case 'ACE': 
        valorNumerico = 14;
        break;
      case 'KING':
        valorNumerico = 13;
        break;
      case 'QUEEN':
        valorNumerico = 12;
        break;
      case 'JACK':
        valorNumerico = 11;
        break;
      default: 
        valorNumerico = parseInt(valorCarta);
        break;
    }
    return valorNumerico;
  }
}
