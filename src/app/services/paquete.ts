
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paquete  } from '../models/paquete';

@Injectable({
  providedIn: 'root'
})

export class PaqueteService {

    private http = inject(HttpClient);
    private apiUrl =  'http://localhost:8080/paquetes/codigo';

    findByCodigoPaquete(codigo:string): Observable<Paquete>{

        return this.http.get<Paquete>(`${this.apiUrl}/${codigo}`);

    }

}
