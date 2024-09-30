import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
