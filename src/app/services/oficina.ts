
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oficina, CreateOficinaRequest  } from '../models/oficina';

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

    createOficina(codigo: string, nombre: string,calle: string,numero: string,ciudad: string,codigoPostal: string,latitud: number,longitud: number,provinciaId: string): Observable<Oficina>{
        const body: CreateOficinaRequest = {
        codigo, nombre, calle, numero, ciudad, codigoPostal, latitud, longitud, provinciaId
        };
        return this.http.post<Oficina>(this.apiUrl,body);
    }

    deleteOficina(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }


}
