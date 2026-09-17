import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CotizarEnvioRequest,TarifaResponse, CrearTarifaRequest } from '../models/Tarifa';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/tarifas/cotizar';
  private apiUrl1 = 'http://localhost:8080/tarifas';
  cotizar(provinciaOrigenId: string, provinciaDestinoId: string, peso: number): Observable<number> {
    const body: CotizarEnvioRequest = {
      provinciaOrigenId,
      provinciaDestinoId,
      peso
    };

    return this.http.post<number>(this.apiUrl, body);
  }
  findAll(): Observable<TarifaResponse[]> {
    return this.http.get<TarifaResponse[]>(this.apiUrl1);
  }

  crear(provinciaOrigenId: string, provinciaDestinoId: string, precioPorKilogramo: number): Observable<TarifaResponse> {
    const body: CrearTarifaRequest = {
      provinciaOrigenId,
      provinciaDestinoId,
      precioPorKilogramo
    };
    return this.http.post<TarifaResponse>(this.apiUrl1, body);
  }

  actualizar(id: string, precioPorKilogramo: number): Observable<TarifaResponse> {
    const body = { precioPorKilogramo };
    return this.http.patch<TarifaResponse>(`${this.apiUrl1}/${id}`, body);
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl1}/${id}`);
  }
}