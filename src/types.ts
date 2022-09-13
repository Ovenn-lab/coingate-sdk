export enum EnviromentEnum {
  LIVE = 'live',
  SANDBOX = 'sandbox'
}

export type ConfigType = {
  apiKey: string | null;
  enviroment: EnviromentEnum;
  apiBase: string;
};

export type AppInfo = {
  name: string;
  version?: string;
};
