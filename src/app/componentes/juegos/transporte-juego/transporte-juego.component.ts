import { Component, OnInit , OnDestroy} from '@angular/core';
import { LogoutService } from '../../../servicios/logout.service';
import { Auth } from '@angular/fire/auth';
import { RegistroPuntajeService } from '../../../servicios/registro-puntaje.service';

@Component({
  selector: 'app-transporte-juego',
  templateUrl: './transporte-juego.component.html',
  styleUrl: './transporte-juego.component.scss'
})
export class TransporteJuegoComponent {
 
  depositos: Map<string, [number, number, boolean, string]> = new Map();
   
  fabricas: Map<string, [number, number, boolean, string]> = new Map(); 

  estanterias: Map<string, [number, number, boolean, string]> = new Map();

  paradasSesion:number = 0;
  paradasMaximasMinimas:number = 4;
  juegoTerminado:boolean = false;
  puntajeActual:number = 0;
  costoOptimo:number = 0;
  costoCotaSuperior:number = 0;
  costoJugada:number = 0;
  errorJugador:boolean = false;
  mensajeErrorJugador:string = "";
  explicacionJuego1:string = "-Sumar o restar cajas que el camion repartira desde las fábricas";
  explicacionJuego2:string = "-Cada deposito tiene un valor por caja asociado de acuerdo a la fábrica";
  explicacionJuego3:string = "-El objetivos es repartir todas las cajas, al menor costo posible";
  explicacionJuego4:string = "-Siempre teniendo en cuenta el numero de paradas determinadas";

  
  constructor(
    public auth: Auth,
    public logout:LogoutService,
    public registroPuntaje:RegistroPuntajeService

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
    this.paradasSesion = 0;
    this.costoOptimo = 900;
    this.costoCotaSuperior = 1300;
    this.costoJugada = 0;
    this.puntajeActual = 0;
    this.errorJugador = false;
    this.juegoTerminado = false;
    //========================DEPOSITOS======================== 
    //(idDeposito,[cantidadActual, capacidadTotal, estaLleno, imagen])

    this.depositos.set('1', [0, 30, false, "../../assets/transporte/deposito-1.png"]);
    this.depositos.set('2', [0, 110, false, "../../assets/transporte/deposito-2.png"]);
    this.depositos.set('3', [0, 80, false, "../../assets/transporte/deposito-3.png"]);    
    
    //========================FABRICAS======================== 
    //(idFabrica,[cantidadActual, produccionTotal, estaLlena, imagen])

    this.fabricas.set('A', [130, 130, true, "../../assets/transporte/fabrica-A.png"]); 
    this.fabricas.set('B', [90, 90, true, "../../assets/transporte/fabrica-B.png"]);  
    
    //========================ESTANTERIAS======================== 
    //(idEstanteria,[cantidadActual, precioPorCaja, estaLleno, imagen])

    this.estanterias.set('1A', [0, 2 ,false, "../../assets/transporte/estantes-1.png"]);
    this.estanterias.set('2A', [0, 5 ,false, "../../assets/transporte/estantes-2.png"]);
    this.estanterias.set('3A', [0, 7 ,false, "../../assets/transporte/estantes-3.png"]); 
    this.estanterias.set('1B', [0, 3 ,false, "../../assets/transporte/estantes-1.png"]);
    this.estanterias.set('2B', [0, 2 ,false, "../../assets/transporte/estantes-2.png"]);
    this.estanterias.set('3B', [0, 8 ,false, "../../assets/transporte/estantes-3.png"]);
  }

  moverCajas(tipoDeMovimiento:string, depositoNumero:string, fabricaLetra:string)
  {
    // this.verificarEstadoDepositoYEstanteria(depositoNumero);//verificar si estan llenos los depositos
    // this.verificarEstadoFabrica(fabricaLetra);//verificar si estan llenas las fabricas
    
    this.errorJugador = false;
    let cantidadDeCajasAMover:number = 10;
    let deposito = this.depositos.get(`${depositoNumero}`);
    let fabrica = this.fabricas.get(`${fabricaLetra}`);
    let estanteria = this.estanterias.get(`${depositoNumero}${fabricaLetra}`);

    //comprobar que no sean undefinded)
    if( fabrica && deposito && estanteria)
    {
      

      switch(tipoDeMovimiento)
      {
        case "agregar":
          if(fabrica[0] >= cantidadDeCajasAMover && deposito[0]!=deposito[1]) //verificacion previa para sumar cajas
          {
            fabrica[0] -= cantidadDeCajasAMover; 
            this.fabricas.set(`${fabricaLetra}`, fabrica);
            estanteria[0] += cantidadDeCajasAMover; 
            this.estanterias.set(`${depositoNumero}${fabricaLetra}`, estanteria);
            deposito[0] += cantidadDeCajasAMover; 
            this.depositos.set(`${depositoNumero}`, deposito);
          }
          break;
        case "quitar":
          if(deposito[0] >= cantidadDeCajasAMover && estanteria[0] >= cantidadDeCajasAMover) //verificacion previa para restar cajas
          {
            fabrica[0] += cantidadDeCajasAMover; 
            this.fabricas.set(`${fabricaLetra}`, fabrica);
            estanteria[0] -= cantidadDeCajasAMover; 
            this.estanterias.set(`${depositoNumero}${fabricaLetra}`, estanteria);
            deposito[0] -= cantidadDeCajasAMover; 
            this.depositos.set(`${depositoNumero}`, deposito);
          }
          break;
      }
      
    }

    this.calcularCantidadDeParadas();
  }


  enviarIntento()
  {

    this.calcularCantidadDeParadas();
    

    if(this.paradasSesion == this.paradasMaximasMinimas && this.fabricas.get('A')?.[0] === 0 && this.fabricas.get('B')?.[0] === 0)
    {
      this.calcularPuntaje();
      this.registroPuntaje.registrarPuntajeEnDB(this.puntajeActual,"Transporte");

    }
    else if(this.fabricas.get('A')?.[0] != 0 && this.fabricas.get('B')?.[0] != 0)
    {
      this.errorJugador = true;
      this.mensajeErrorJugador = `QUEDAN CAJAS POR REPARTIR`
    }
    else if(this.paradasSesion != this.paradasMaximasMinimas)
    {  
      this.errorJugador = true;
      this.mensajeErrorJugador = `SE DEBEN REALIZAR ${this.paradasMaximasMinimas} PARADAS! NI MÁS NI MENOS!`
    }
     
  }

  calcularPuntaje()
  {
    this.estanterias.forEach(estanteria => {
      this.costoJugada += estanteria[0]* estanteria[1];
    });    

    // cota superior - costo optimo -------------------- 10 puntos
    // cota superior - costo jugada -------------------- X puntos
    // X = (cota superior - costo jugada)*10/(cota superior - costo optimo)

    // let diferenciaCostoJugadaCostoCotaSuperior = this.costoCotaSuperior - this.costoJugada; 
    // let diferenciaCostoCotaSuperiorCostoOptimo = this.costoCotaSuperior - this.costoOptimo;

    let exponente =  (this.costoOptimo - this.costoJugada)/(this.costoCotaSuperior - this.costoOptimo);
    
    this.puntajeActual = Math.round(10*(Math.pow(10,exponente)));
    
    if(this.puntajeActual < 10)
    {
      Math.round(this.puntajeActual);
    }
    this.juegoTerminado = true;
  }

  calcularCantidadDeParadas()
  {
    this.paradasSesion = 0;

    this.estanterias.forEach(estanteria => {
      if(estanteria[0]!=0)
      {        
        this.paradasSesion += 1;
      }
      
      console.log(this.paradasSesion);
    });
  }

}
