export interface CotizarEnvioRequest {
  provinciaOrigenId: string;
  provinciaDestinoId: string;
  peso: number;
}

export type CotizarEnvioResponse = number;