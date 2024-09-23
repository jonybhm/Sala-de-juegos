import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  
  constructor() { }
  
  http = inject(HttpClient);

  robarCartaMazo(deckId: string)
  {
    return this.http.request('GET',`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  }
   
}
