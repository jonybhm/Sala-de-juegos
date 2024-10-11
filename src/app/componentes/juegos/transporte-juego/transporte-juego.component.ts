import { Component, OnInit , OnDestroy} from '@angular/core';
import { LogoutService } from '../../../servicios/logout.service';
import { Auth } from '@angular/fire/auth';
import { RegistroPuntajeService } from '../../../servicios/registro-puntaje.service';
import { ProgramacionLinealService } from '../../../servicios/programacion-lineal.service';

@Component({
  selector: 'app-transporte-juego',
  templateUrl: './transporte-juego.component.html',
  styleUrl: './transporte-juego.component.scss'
})
export class TransporteJuegoComponent {
 
  depositos: Map<string, [number, number, boolean, string]> = new Map();
   
  fabricas: Map<string, [number, number, boolean, string]> = new Map(); 

  estanterias: Map<string, [number, number, boolean, string]> = new Map();

  sumaProducciones!:number;
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
    public registroPuntaje:RegistroPuntajeService,
    public programacionLienal:ProgramacionLinealService
  )
  {}

  ngOnInit(): void
  {
    this.iniciarJuego();
  }

  ngOnDestroy(): void {
  }
  

  async iniciarJuego()
  {
    this.paradasSesion = 0;
    
    this.costoJugada = 0;
    this.puntajeActual = 0;
    this.errorJugador = false;
    this.juegoTerminado = false;

    //========================FABRICAS======================== 
    //(idFabrica,[cantidadActual, produccionTotal, estaLlena, imagen])

    //========================DEPOSITOS======================== 
    //(idDeposito,[cantidadActual, capacidadTotal, estaLleno, imagen])

 
    this.generarFabricasYDepositos();

    //========================ESTANTERIAS======================== 
    //(idEstanteria,[cantidadActual, precioPorCaja, estaLleno, imagen])

    this.generarEstanterias();    
    
    //========================VALOR OPTIMO========================
    //Resolucion mediante programacion lineal
    await this.programacionLienal.resolverProblemaTransporte(
      this.estanterias.get('1A')?.[1] ?? 0,
      this.estanterias.get('2A')?.[1] ?? 0,
      this.estanterias.get('3A')?.[1] ?? 0,
      this.estanterias.get('1B')?.[1] ?? 0,
      this.estanterias.get('2B')?.[1] ?? 0,
      this.estanterias.get('3B')?.[1] ?? 0,
      this.fabricas.get('A')?.[1] ?? 0,
      this.fabricas.get('B')?.[1] ?? 0,
      this.depositos.get('1')?.[1] ?? 0,
      this.depositos.get('2')?.[1] ?? 0,
      this.depositos.get('3')?.[1] ?? 0
    ).then(resultado => {
      const z = resultado.result.z; 
      console.log('Valor de z:', z);
      this.costoOptimo = z;
    });

    this.costoCotaSuperior = this.calcularCotaSuperior();  

  }

  moverCajas(tipoDeMovimiento:string, depositoNumero:string, fabricaLetra:string)
  {
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
          //verificacion previa para sumar cajas
          if(fabrica[0] >= cantidadDeCajasAMover && deposito[0]!=deposito[1]) 
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
          //verificacion previa para restar cajas
          if(deposito[0] >= cantidadDeCajasAMover && estanteria[0] >= cantidadDeCajasAMover) 
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

  calcularCotaSuperior()
  {
    let produccionA = this.fabricas.get('A')?.[1] ?? 0; 
    let produccionB = this.fabricas.get('B')?.[1] ?? 0;
    this.sumaProducciones = produccionA + produccionB;
    let flagValorEstanteria = 0;
    this.estanterias.forEach(element => {
      console.log(flagValorEstanteria);
      if(element?.[1] > flagValorEstanteria)
      {
        flagValorEstanteria = element?.[1] 
      }
      
    });
    return this.sumaProducciones * flagValorEstanteria;
  }

  //========================ESTANTERIAS======================== 


  getRandomArbitrary(min:number, max:number) 
  {
    return Math.round(Math.random() * (max - min) + min);
  }

  generarEstanterias()
  {
    this.estanterias.set('1A', [0, this.getRandomArbitrary(1,10) ,false, "../../assets/transporte/estantes-1.png"]);
    this.estanterias.set('2A', [0, this.getRandomArbitrary(1,10) ,false, "../../assets/transporte/estantes-2.png"]);
    this.estanterias.set('3A', [0, this.getRandomArbitrary(1,10) ,false, "../../assets/transporte/estantes-3.png"]); 
    this.estanterias.set('1B', [0, this.getRandomArbitrary(1,10) ,false, "../../assets/transporte/estantes-1.png"]);
    this.estanterias.set('2B', [0, this.getRandomArbitrary(1,10) ,false, "../../assets/transporte/estantes-2.png"]);
    this.estanterias.set('3B', [0, this.getRandomArbitrary(1,10) ,false, "../../assets/transporte/estantes-3.png"]);
  }

  //========================FABRICAS Y DEPOSITOS======================== 

  getRandomUniqueMultipleOfTen(min: number, max: number, existentes: Set<number>)
  {
    let numero: number;
    do 
    {
      numero = Math.round(Math.random() * ((max - min) / 10)) * 10 + min;
    } 
    while (existentes.has(numero)); 
    
    existentes.add(numero); 
    return numero;
  }

  generarFabricasYDepositos() 
  {
    const produccionTotal = 250; 
    const valoresExistentes = new Set<number>();

    const produccionA = this.getRandomUniqueMultipleOfTen(50, produccionTotal - 50, valoresExistentes);
    const produccionB = produccionTotal - produccionA; 
    valoresExistentes.add(produccionB); 

    const capacidadDeposito1 = this.getRandomUniqueMultipleOfTen(30, produccionTotal - 60, valoresExistentes);
    const capacidadDeposito2 = this.getRandomUniqueMultipleOfTen(30, produccionTotal - capacidadDeposito1 - 30, valoresExistentes);
    const capacidadDeposito3 = produccionTotal - capacidadDeposito1 - capacidadDeposito2;
    valoresExistentes.add(capacidadDeposito3);

    
    this.fabricas.set('A', [produccionA, produccionA, true, "../../assets/transporte/fabrica-A.png"]);
    this.fabricas.set('B', [produccionB, produccionB, true, "../../assets/transporte/fabrica-B.png"]);

    this.depositos.set('1', [0, capacidadDeposito1, false, "../../assets/transporte/deposito-1.png"]);
    this.depositos.set('2', [0, capacidadDeposito2, false, "../../assets/transporte/deposito-2.png"]);
    this.depositos.set('3', [0, capacidadDeposito3, false, "../../assets/transporte/deposito-3.png"]);

    console.log('Producción Fábrica A:', produccionA);
    console.log('Producción Fábrica B:', produccionB);
    console.log('Capacidad Depósito 1:', capacidadDeposito1);
    console.log('Capacidad Depósito 2:', capacidadDeposito2);
    console.log('Capacidad Depósito 3:', capacidadDeposito3);
  }

}
