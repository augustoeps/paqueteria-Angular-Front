import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia } from '../models/Provincia';
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
}


