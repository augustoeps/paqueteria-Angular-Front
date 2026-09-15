import { Component, inject, OnInit, signal } from '@angular/core';
import { CrearProvinciaRequest, Provincia, DeleteProvinciaRequest } from '../../../models/Provincia';
import { ProvinciaService } from '../../../services/provincia';
import { AuthService } from '../../../services/AuthService';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [FormsModule],
  selector: 'app-provincias',
  styleUrl: './provincias.css',
  templateUrl: './provincias.html',
})
export class Provincias implements OnInit {

  provinciaServicio = inject(ProvinciaService);
  authService = inject(AuthService);

  provincias = signal<Provincia[]>([]);
  protected nuevoNombre = signal<string>('');

  ngOnInit(): void {
    this.provinciaServicio.findAll().subscribe(resultado =>{
      this.provincias.set(resultado);
    })
  }

  crearProvincia(nombre: string): void {
    this.provinciaServicio.createProvincia(nombre).subscribe(resultado => {
        this.provincias.update(listaActual => [...listaActual, resultado]);
    });
}
  
  updateProvincia(id: string, nombre: string): void {
    this.provinciaServicio.updateProvincia(id, nombre).subscribe(resultado => {
      this.provincias.update(listaActual =>
        listaActual.map(p => p.id === resultado.id ? resultado : p)
      );
    });
  }

  eliminarProvincia(id: string): void {
    this.provinciaServicio.deleteProvincia(id).subscribe(() => {
      this.provincias.update(listaActual =>
        listaActual.filter(p => p.id !== id)
      );
    });
  }

  esAdmin():boolean{
    return this.authService.esAdmin();
  }


protected provinciaEditandoId = signal<string | null>(null);
protected nombreEditado = signal<string>('');

iniciarEdicion(provincia: Provincia): void {
  this.provinciaEditandoId.set(provincia.id);
  this.nombreEditado.set(provincia.nombre);
}

guardarEdicion(id: string): void {
  this.updateProvincia(id, this.nombreEditado());
  this.provinciaEditandoId.set(null);
}

cancelarEdicion(): void {
  this.provinciaEditandoId.set(null);
}


}
