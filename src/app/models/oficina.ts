export interface Oficina {
  id: string;
  codigo: string;
  nombre: string;
  calle: string;
  numero: string;
  ciudad: string;
  codigoPostal: string;
  latitud: number;
  longitud: number;
  provinciaId: string;
}


export interface CreateOficinaRequest{
  codigo: string;
  nombre: string;
  calle: string;
  numero: string;
  ciudad: string;
  codigoPostal: string;
  latitud: number;
  longitud: number;
  provinciaId: string;
}




