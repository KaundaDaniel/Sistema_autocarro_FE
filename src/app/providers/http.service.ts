import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}

  public base_url = 'http://127.0.0.1:8080/api';
  //public base_url = 'http://135.181.41.138:3000/api/v1'; //PRD
}
