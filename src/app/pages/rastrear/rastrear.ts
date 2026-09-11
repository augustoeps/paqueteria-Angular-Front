import { Component, signal, Injectable, inject } from '@angular/core';

import { Paquete } from '../../models/paquete';
import { HistorialEstado } from '../../models/historialEstado';
import { FormsModule } from '@angular/forms';
import { PaqueteService } from '../../services/paquete';
import { HistorialEstadoService } from '../../services/historial-estado';
import { HistorialCard } from '../../shared/historial-card/historial-card';
@Component({
  imports: [FormsModule, HistorialCard],
  selector: 'app-rastrear',
  styleUrl: './rastrear.css',
  templateUrl: './rastrear.html',
})
export class Rastrear {

  private paqueteservice = inject(PaqueteService);
  private  historialEstadoservice = inject(HistorialEstadoService);

   protected paquete = signal<Paquete | null>(null)
   protected historialEstado = signal<HistorialEstado[]>([]);

   protected codigoIngresado = signal<string>('');

   findPackage(codigo: string) {
      this.paqueteservice.findByCodigoPaquete(codigo).subscribe(paquete => {
        this.paquete.set(paquete);

        this.historialEstadoservice.findByPaqueteId(paquete.id).subscribe(historialEstado => {
          this.historialEstado.set(historialEstado);
        });
      });
  }

}
