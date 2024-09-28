import { Component, OnInit , OnDestroy} from '@angular/core';
import { LogoutService } from '../../../servicios/logout.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-transporte-juego',
  templateUrl: './transporte-juego.component.html',
  styleUrl: './transporte-juego.component.scss'
})
export class TransporteJuegoComponent {
 
  depositos: Map<string, [number, number, boolean, string]> = new Map();
   
  fabricas: Map<string, [number, number, boolean, string]> = new Map(); 

  estanterias: Map<string, [number, number, boolean, string]> = new Map();

  valorOptimo:number = 150;
  paradasMaximas:number = 4;
  juegoTerminado:boolean = false;
  puntajeActual:number = 0;
  
  constructor(
    public auth: Auth,
    public logout:LogoutService,
  )
  {}

  ngOnInit(): void
  {
    this.iniciarJuego();
  }

  ngOnDestroy(): void {
  }
  

  iniciarJuego()
  {
    this.juegoTerminado=false;
    //========================DEPOSITOS======================== 

    this.depositos.set('deposito1', [0, 30, false, "../../assets/transporte/deposito-1.png"]);
    this.depositos.set('deposito2', [0, 110, false, "../../assets/transporte/deposito-2.png"]);
    this.depositos.set('deposito3', [0, 80, false, "../../assets/transporte/deposito-3.png"]);    
    
    //========================FABRICAS======================== 

    this.fabricas.set('fabricaA', [130, 130, true, "../../assets/transporte/fabrica-A.png"]); 
    this.fabricas.set('fabricaB', [90, 90, true, "../../assets/transporte/fabrica-B.png"]);  
    
    //========================ESTANTERIAS======================== 

    this.estanterias.set('estanteria1A', [0, 2 ,true, "../../assets/transporte/estantes-1.png"]);
    this.estanterias.set('estanteria2A', [0, 5 ,true, "../../assets/transporte/estantes-2.png"]);
    this.estanterias.set('estanteria3A', [0, 7 ,true, "../../assets/transporte/estantes-3.png"]); 
    this.estanterias.set('estanteria1B', [0, 3 ,true, "../../assets/transporte/estantes-1.png"]);
    this.estanterias.set('estanteria2B', [0, 2 ,true, "../../assets/transporte/estantes-2.png"]);
    this.estanterias.set('estanteria3B', [0, 8 ,true, "../../assets/transporte/estantes-3.png"]);
  }

  moverCajas(tipoDeMovimiento:string, origen:string)
  {

  }

  enviar()
  {
    this.juegoTerminado=true;
  }
}
