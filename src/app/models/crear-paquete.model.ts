export interface DireccionContactoRequest {
  calle: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
}

export interface DatosContactoRequest {
  nombre: string;
  telefono: string;
  email: string;
  direccion: DireccionContactoRequest;
}

export interface CrearPaqueteRequest {
  peso: number;
  oficinaOrigenId: string;
  oficinaDestinoId: string;
  remitente: DatosContactoRequest;
  destinatario: DatosContactoRequest;
}

