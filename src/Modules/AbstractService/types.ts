import { GetCurrenciesData, GetExchangeRateData } from '#Modules/Public/types';

export type BuildPathInput = {
  path: string;
  params?:
    | {
        separator?: string;
        order_id?: number;
        id?: number;
      }
    | GetExchangeRateData
    | GetCurrenciesData;
};
