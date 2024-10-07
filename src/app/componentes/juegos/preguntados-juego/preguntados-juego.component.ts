import { Component , OnInit , OnDestroy} from '@angular/core';
import { CartasService } from '../../../servicios/cartas.service';
import { Subscription } from 'rxjs';
import { LogoutService } from '../../../servicios/logout.service';
import { Auth } from '@angular/fire/auth';
import { TriviaService } from '../../../servicios/trivia.service';
import randomArrayElement from '@smakss/random-array-element';
import { RegistroPuntajeService } from '../../../servicios/registro-puntaje.service';


@Component({
  selector: 'app-preguntados-juego',
  templateUrl: './preguntados-juego.component.html',
  styleUrl: './preguntados-juego.component.scss'
})
export class PreguntadosJuegoComponent implements OnDestroy,OnInit{

  categoriaActual: string = "";
  triviaActual: any;

  preguntaIndex:number = 0;
  preguntaTriviaActual: any;
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
  }
  
  seleccionarCategoria(categoria:string)
  {    
    let hojaNumero = Math.round(this.getRandomArbitrary(1,2));
    
    this.sub = this.trivia.generarPreguntaNueva(categoria,hojaNumero.toString()).subscribe(nuevaTrivia => {
      //Obtener trivia de 10 preguntas segun la categoria seleccionada
      this.triviaActual = nuevaTrivia;      

      this.triviaActual.questions.sort(() => Math.random() - 0.5);
      this.barajarPreguntas();
      

      console.log(this.todasLasRespuestasActuales);

      this.categoriarSeleccionada = true;
    });  
  }
  
  enviarRespuesta()
  {
    if(this.opcionSeleccionada)
    {
      console.log(this.opcionSeleccionada);
      
      if(this.opcionSeleccionada == this.respuestaCorrectaActual)
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
    this.preguntaTriviaActual = this.triviaActual.questions[this.preguntaIndex].question;
    this.respuestaCorrectaActual = this.triviaActual.questions[this.preguntaIndex].correctAnswers;  
    this.respuestasIncorrectasActual = this.triviaActual.questions[this.preguntaIndex].incorrectAnswers;

    //Agregar valores al array de respuestas y mezclarlas
    this.respuestasIncorrectasActual.forEach(element => {
      this.todasLasRespuestasActuales.push(element);        
    });    
    this.todasLasRespuestasActuales.push(this.respuestaCorrectaActual);
    this.todasLasRespuestasActuales.sort(() => Math.random() - 0.5);

    console.log(this.respuestaCorrectaActual);
  }

  getRandomArbitrary(min:number, max:number) {
    return Math.random() * (max - min) + min;
  }

}
