
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oficina  } from '../models/oficina';

@Injectable({
  providedIn: 'root'
})

export class OficinaService {

    private http = inject(HttpClient);
    private apiUrl =  'http://localhost:8080/oficinas';

    findAllOficinas(): Observable<Oficina[]>{
        return this.http.get<Oficina[]>(this.apiUrl);
    }
    findById(id: string): Observable<Oficina> {
          return this.http.get<Oficina>(`${this.apiUrl}/${id}`);
    }

}
