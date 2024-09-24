import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PalabrasRandomService {

  constructor() { }

  http = inject(HttpClient);

  randomizarPalabra()
  {
    return this.http.request('GET',`https://clientes.api.greenborn.com.ar/public-random-word`);
  }
}
