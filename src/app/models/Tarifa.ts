export interface CotizarEnvioRequest {
  provinciaOrigenId: string;
  provinciaDestinoId: string;
  peso: number;
}

export type CotizarEnvioResponse = number;

export interface TarifaResponse {
  id: string;
  provinciaOrigenId: string;
  provinciaDestinoId: string;
  precioPorKilogramo: number;
}

export interface CrearTarifaRequest{
      provinciaOrigenId: string,
      provinciaDestinoId:string,
      precioPorKilogramo:number,
    };