import { EstadoPaquete } from './paquete';

export interface HistorialEstado {
  id: string;
  paqueteId: string;
  estadoPaquete: EstadoPaquete;
  fecha: string;
  oficinaId: string;
}


