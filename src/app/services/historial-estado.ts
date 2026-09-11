
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialEstado  } from '../models/historialEstado';

@Injectable({
  providedIn: 'root'
})


export class HistorialEstadoService {
    private http = inject(HttpClient);
    private apiUrl =  'http://localhost:8080/historial-estados/paquete';

    

    findByPaqueteId(id:string): Observable<HistorialEstado[]>{

        return this.http.get<HistorialEstado[]>(`${this.apiUrl}/${id}`);
    }
}



