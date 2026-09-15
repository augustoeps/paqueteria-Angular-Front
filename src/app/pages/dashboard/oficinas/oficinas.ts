import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OficinaService } from '../../../services/oficina';
import { ProvinciaService } from '../../../services/provincia';
import { AuthService } from '../../../services/AuthService';
import { Oficina } from '../../../models/oficina';
import { Provincia } from '../../../models/Provincia';

@Component({
  imports: [FormsModule],
  selector: 'app-gestionar-oficinas',
  styleUrl: './oficinas.css',
  templateUrl: './oficinas.html',
})
export class GestionarOficinas implements OnInit {

  private oficinaService = inject(OficinaService);
  private provinciaService = inject(ProvinciaService);
  private authService = inject(AuthService);

  protected oficinas = signal<Oficina[]>([]);
  protected provincias = signal<Provincia[]>([]);
  protected mostrarFormulario = signal<boolean>(false);

  protected codigo = signal<string>('');
  protected nombre = signal<string>('');
  protected calle = signal<string>('');
  protected numero = signal<string>('');
  protected ciudad = signal<string>('');
  protected codigoPostal = signal<string>('');
  protected latitud = signal<number | null>(null);
  protected longitud = signal<number | null>(null);
  protected provinciaSeleccionada = signal<string>('');

  ngOnInit(): void {
    this.oficinaService.findAllOficinas().subscribe(resultado => {
      this.oficinas.set(resultado);
    });

    this.provinciaService.findAll().subscribe(resultado => {
      this.provincias.set(resultado);
    });
  }

  esAdmin(): boolean {
    return this.authService.esAdmin();
  }

  toggleFormulario(): void {
    this.mostrarFormulario.update(valor => !valor);
  }

  crearOficina(): void {
    this.oficinaService.createOficina(
      this.codigo(),
      this.nombre(),
      this.calle(),
      this.numero(),
      this.ciudad(),
      this.codigoPostal(),
      this.latitud()!,
      this.longitud()!,
      this.provinciaSeleccionada()
    ).subscribe(resultado => {
      this.oficinas.update(listaActual => [...listaActual, resultado]);
      this.mostrarFormulario.set(false);
    });
  }

  eliminarOficina(id: string): void {
    this.oficinaService.deleteOficina(id).subscribe(() => {
      this.oficinas.update(listaActual => listaActual.filter(o => o.id !== id));
    });
  }

  nombreProvincia(provinciaId: string): string {
    const provincia = this.provincias().find(p => p.id === provinciaId);
    return provincia ? provincia.nombre : 'Desconocida';
  }
}