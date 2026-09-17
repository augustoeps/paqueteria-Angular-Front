import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OficinaService } from '../../../services/oficina';
import { PaqueteService } from '../../../services/paquete';
import { Oficina } from '../../../models/oficina';
import { CrearPaqueteRequest, DatosContactoRequest,DireccionContactoRequest } from '../../../models/crear-paquete.model';

@Component({
  imports: [FormsModule],
  selector: 'app-crear-envio',
  styleUrl: './crear-envio.css',
  templateUrl: './crear-envio.html',
})
export class CrearEnvio implements OnInit {

  private oficinaService = inject(OficinaService);
  private paqueteService = inject(PaqueteService);
  private router = inject(Router);

  protected oficinas = signal<Oficina[]>([]);

  protected peso = signal<number | null>(null);
  protected oficinaOrigenId = signal<string>('');
  protected oficinaDestinoId = signal<string>('');

  protected remitente = signal<DatosContactoRequest>({
    nombre: '', telefono: '', email: '',
    direccion: { calle: '', ciudad: '', provincia: '', codigoPostal: '' }
  });

  protected destinatario = signal<DatosContactoRequest>({
    nombre: '', telefono: '', email: '',
    direccion: { calle: '', ciudad: '', provincia: '', codigoPostal: '' }
  });

  protected paqueteCreado = signal<string | null>(null);
  protected error = signal<string | null>(null);

  ngOnInit(): void {
    this.oficinaService.findAllOficinas().subscribe(resultado => {
      this.oficinas.set(resultado);
    });
  }

  crear(): void {
    this.error.set(null);

    const request: CrearPaqueteRequest = {
      peso: this.peso()!,
      oficinaOrigenId: this.oficinaOrigenId(),
      oficinaDestinoId: this.oficinaDestinoId(),
      remitente: this.remitente(),
      destinatario: this.destinatario()
    };

    this.paqueteService.crearPaquete(request).subscribe({
      next: (resultado) => {
        this.paqueteCreado.set(resultado.codigoSeguimiento);
      },
      error: () => {
        this.error.set('No se pudo crear el envío. Verifica los datos ingresados.');
      }
    });
  }



  actualizarRemitente(campo: keyof Omit<DatosContactoRequest, 'direccion'>, valor: string): void {
  this.remitente.update(r => ({ ...r, [campo]: valor }));
}

actualizarDireccionRemitente(campo: keyof DireccionContactoRequest, valor: string): void {
  this.remitente.update(r => ({ ...r, direccion: { ...r.direccion, [campo]: valor } }));
}

actualizarDestinatario(campo: keyof Omit<DatosContactoRequest, 'direccion'>, valor: string): void {
  this.destinatario.update(d => ({ ...d, [campo]: valor }));
}

actualizarDireccionDestinatario(campo: keyof DireccionContactoRequest, valor: string): void {
  this.destinatario.update(d => ({ ...d, direccion: { ...d.direccion, [campo]: valor } }));
}


}