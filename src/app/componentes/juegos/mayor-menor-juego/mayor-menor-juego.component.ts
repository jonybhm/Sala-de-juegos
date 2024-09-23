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
  mazoActual: any;
  mazoId: string = "";
  sub!: Subscription;
  puntajeActual:number =0;

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
    this.sub = this.cartas.robarCartaMazo('new').subscribe(mazoNuevoMezclado => {
      this.mazoActual = mazoNuevoMezclado;
      this.mazoId = this.mazoActual.deck_id;
      this.cartaActual = this.mazoActual.cards[0];
      console.log(this.cartaActual);
    });
  }
  
  robarCarta()
  {
    this.sub = this.cartas.robarCartaMazo(this.mazoId).subscribe(mazo => {
      this.mazoActual = mazo;
      this.cartaActual = this.mazoActual.cards[0];
      console.log(this.cartaActual);
    });
  }
}
