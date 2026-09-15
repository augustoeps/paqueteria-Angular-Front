export interface Provincia {
  id: string;
  nombre: string;
}

export interface CrearProvinciaRequest {
  nombre: string;
}

export interface DeleteProvinciaRequest {
  id: string;
}