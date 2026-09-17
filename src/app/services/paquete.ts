import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paquete, PaqueteCompleto } from '../models/paquete';
import {CrearPaqueteRequest } from '../models/crear-paquete.model';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/paquetes';

  findByCodigoPaquete(codigo: string): Observable<Paquete> {
    return this.http.get<Paquete>(`${this.apiUrl}/codigo/${codigo}`);
  }

  crearPaquete(request: CrearPaqueteRequest): Observable<PaqueteCompleto> {
    return this.http.post<PaqueteCompleto>(this.apiUrl, request);
  }
  findById(id: string): Observable<PaqueteCompleto> {
    return this.http.get<PaqueteCompleto>(`${this.apiUrl}/${id}`);
    }
}