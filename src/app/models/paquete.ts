export type EstadoPaquete = 'CREADO' | 'EN_TRANSITO' | 'EN_OFICINA_DESTINO' | 'ENTREGADO' | 'CANCELADO';

export interface DireccionContacto {
  calle: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
}

export interface DatosContacto {
  nombre: string;
  telefono: string;
  email: string;
  direccion: DireccionContacto;
}

export interface Paquete {
  id: string;
  codigoSeguimiento: string;
  peso: number;
  estadoPaquete: EstadoPaquete;
  remitente: DatosContacto;
  destinatario: DatosContacto;
}

export interface PaqueteCompleto {
  id: string;
  codigoSeguimiento: string;
  peso: number;
  estadoPaquete: EstadoPaquete;
  oficinaOrigenId: string;
  oficinaDestinoId: string;
  remitente: DatosContacto;
  destinatario: DatosContacto;
  tarifaAplicada: number;
  fechaCreacion: string;
}