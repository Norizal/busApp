import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = 'https://bustracker.rizal23.com/api/';

  constructor() { }
}
