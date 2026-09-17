import { Component, inject, OnInit, signal } from '@angular/core';
import { ProvinciaService } from '../../../services/provincia'; 
import { Provincia } from '../../../models/Provincia';
import { TarifaResponse } from '../../../models/Tarifa';
import { TarifaService } from '../../../services/tarifa';
import { AuthService } from '../../../services/AuthService';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-tarifas',
  styleUrl: './tarifas.css',
  templateUrl: './tarifas.html',
})
export class Tarifas implements OnInit {

  provinciasService = inject(ProvinciaService);
  tarifaService = inject(TarifaService);
  authService = inject(AuthService);

  provincias = signal<Provincia[]>([]);
  tarifas = signal<TarifaResponse[]>([]);
  isAdmin = signal<boolean>(false);

  //signal de formularios 
  protected origenSeleccionado = signal<string>('');
  protected destinoSeleccionado = signal<string>('');
  protected precioIngresado = signal<number | null>(null);

  ngOnInit(): void {

      this.provinciasService.findAll().subscribe(resultado => {
        this.provincias.set(resultado);
      })
      this.tarifaService.findAll().subscribe(resultado1 => {
        this.tarifas.set(resultado1);
      })
      this.isAdmin.set(this.authService.esAdmin());
  }

  create(provinciaOrigenId: string, provinciaDestinoId: string, precioPorKilogramo: number): void {
  this.tarifaService.crear(provinciaOrigenId, provinciaDestinoId, precioPorKilogramo)
    .subscribe(resultado => {
      this.tarifas.update(listaActual => [...listaActual, resultado]);
    });
  }

  nombreProvincia(provinciaId: string): string {
    const provincia = this.provincias().find(p => p.id === provinciaId);
    return provincia ? provincia.nombre : 'Desconocida';
  }

  protected tarifaEditandoId = signal<string | null>(null);
protected precioEditado = signal<number | null>(null);

iniciarEdicion(tarifa: TarifaResponse): void {
  this.tarifaEditandoId.set(tarifa.id);
  this.precioEditado.set(tarifa.precioPorKilogramo);
}

guardarEdicion(id: string): void {
  this.tarifaService.actualizar(id, this.precioEditado()!).subscribe(resultado => {
    this.tarifas.update(listaActual =>
      listaActual.map(t => t.id === resultado.id ? resultado : t)
    );
    this.tarifaEditandoId.set(null);
  });
}

cancelarEdicion(): void {
  this.tarifaEditandoId.set(null);
}

eliminarTarifa(id: string): void {
  this.tarifaService.eliminar(id).subscribe(() => {
    this.tarifas.update(listaActual => listaActual.filter(t => t.id !== id));
  });
}



}
