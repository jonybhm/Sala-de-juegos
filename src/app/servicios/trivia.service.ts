import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  
  constructor() { }
  
  http = inject(HttpClient);

  generarPreguntaNueva(categoria:string, hoja:string)
  {

    console.log(hoja);

    const headers = new HttpHeaders({
      'Authorization': ` $2b$12$8eAvllv7QYEaRSKbASgCge4PX9Px8YEZTh7qM1EgYgkTBO12YsbVu` 
    });

    return this.http.request('GET',`https://api.quiz-contest.xyz/questions?limit=10&page=${hoja}&category=${categoria}&format=multiple`,{headers});
  }

  
  
   
}
