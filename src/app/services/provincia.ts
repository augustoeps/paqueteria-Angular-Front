import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia, CrearProvinciaRequest, DeleteProvinciaRequest } from '../models/Provincia';
@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/provincias';

  findAll(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.apiUrl);
  }

  findById(id: string): Observable<Provincia> {
      return this.http.get<Provincia>(`${this.apiUrl}/${id}`);
  }

  createProvincia(nombre: string): Observable<Provincia> {
  const body: CrearProvinciaRequest = {
      nombre
  };

  return this.http.post<Provincia>(this.apiUrl, body);
  }

  updateProvincia(id: string, nombre: string): Observable<Provincia> {
  const body: CrearProvinciaRequest = {
    nombre
  };

  return this.http.patch<Provincia>(`${this.apiUrl}/${id}`, body);
}

  deleteProvincia(id: string): Observable<Provincia> {
  
    return this.http.delete<Provincia>(`${this.apiUrl}/${id}`);
  }

}


