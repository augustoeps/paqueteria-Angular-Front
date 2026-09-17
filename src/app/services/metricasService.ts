import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadisticasPorTipo, EstadisticasPorId } from '../models/metricas.model';

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/eventos/estadisticas';

  porTipo(): Observable<EstadisticasPorTipo> {
    return this.http.get<EstadisticasPorTipo>(`${this.apiUrl}/por-tipo`);
  }

  ingresosTotales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ingresos-totales`);
  }

  porProvincia(): Observable<EstadisticasPorId> {
    return this.http.get<EstadisticasPorId>(`${this.apiUrl}/por-provincia`);
  }

  porOficina(): Observable<EstadisticasPorId> {
    return this.http.get<EstadisticasPorId>(`${this.apiUrl}/por-oficina`);
  }
}