import { Component , OnInit , OnDestroy} from '@angular/core';
import { CartasService } from '../../../servicios/cartas.service';
import { Subscription } from 'rxjs';
import { LogoutService } from '../../../servicios/logout.service';
import { Auth } from '@angular/fire/auth';
import { TriviaService } from '../../../servicios/trivia.service';
import randomArrayElement from '@smakss/random-array-element';
import { RegistroPuntajeService } from '../../../servicios/registro-puntaje.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-preguntados-juego',
  templateUrl: './preguntados-juego.component.html',
  styleUrl: './preguntados-juego.component.scss'
})
export class PreguntadosJuegoComponent implements OnDestroy,OnInit{

  categoriaActual: string = "";
  monstruosLista: any;

  preguntaIndex:number = 0;
  preguntaActual: any;
  
  todasLasRespuestasActuales:any[] = [];

  respuestaCorrectaActual: any;
  respuestasIncorrectasActual: any[] = [];

  opcionSeleccionada:any;
  puntajeActual:number = 0;
  preguntasPorCateogria:number = 5;
  juegoPerdido:boolean = false;
  categoriarSeleccionada:boolean = false;
  puntajeFinal:number = 0;

  sub!: Subscription;

  constructor(
    public auth: Auth,
    private trivia: TriviaService,
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
    this.preguntaIndex = 0;
    this.todasLasRespuestasActuales = [];
    this.juegoPerdido = false;
    this.categoriarSeleccionada = false;   
    this.generarListaMonstruos();
  }
  
  generarListaMonstruos()
  {        
    this.sub = this.trivia.generarListaMonstruos().subscribe(monstruos => {
      this.monstruosLista = monstruos;        
      this.barajarPreguntas();      
    });  
  }

  obtenerMonstruo(urlMonstruo:string)
  {        
    this.sub = this.trivia.obtenerMonstruoPorUrl(urlMonstruo).subscribe(monstruo => {
      this.todasLasRespuestasActuales.push(monstruo);
      
    });  
  }
  
  enviarRespuesta()
  {
    if(this.opcionSeleccionada)
    {
      console.log(this.opcionSeleccionada);
      
      if(this.opcionSeleccionada == this.respuestaCorrectaActual.name)
      {
        this.puntajeActual += 1;
      }

      if(this.preguntaIndex+1 < this.preguntasPorCateogria)
      {
        this.preguntaIndex+=1;
        this.todasLasRespuestasActuales = []; 
        this.barajarPreguntas();   
      }
      else
      {
        this.juegoPerdido=true;
        this.registroPuntaje.registrarPuntajeEnDB(this.puntajeActual,"Preguntados");

      }        

      this.opcionSeleccionada = null;
    }

  }

 barajarPreguntas()
 {
   //Mezclar y obtener preguntas y respuestas correctas e incorrectas      
  this.monstruosLista.results.sort(() => Math.random() - 0.5);
  
  const monstruoObservables = [];
  for (let i = 1; i < 5; i++) 
  {
    const url = this.monstruosLista.results[i].url;
    monstruoObservables.push(this.trivia.obtenerMonstruoPorUrl(url));
  }

  forkJoin(monstruoObservables).subscribe((monstruos) => {
    this.todasLasRespuestasActuales = monstruos;
    
    this.respuestaCorrectaActual = this.todasLasRespuestasActuales[0];

    this.todasLasRespuestasActuales.sort(() => Math.random() - 0.5);

    console.log("Respuesta Correcta:", this.respuestaCorrectaActual);
    console.log("Todas las Respuestas:", this.todasLasRespuestasActuales);
  });
 }

  getRandomArbitrary(min:number, max:number) 
  {
    return Math.random() * (max - min) + min;
  }

}
