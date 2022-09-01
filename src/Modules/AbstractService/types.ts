export interface ClientInterface {
  method: string;
  absUrl: string;
  headers: string[];
  params: string[];
}

export type BuildPathInput = {
  path: string;
  pathEnd?: string;
  params?: object;
};
