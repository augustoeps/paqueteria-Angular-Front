import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CotizarEnvioRequest } from '../models/Tarifa';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/tarifas/cotizar';

  cotizar(provinciaOrigenId: string, provinciaDestinoId: string, peso: number): Observable<number> {
    const body: CotizarEnvioRequest = {
      provinciaOrigenId,
      provinciaDestinoId,
      peso
    };

    return this.http.post<number>(this.apiUrl, body);
  }
}