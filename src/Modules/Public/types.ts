export type GetExchangeRateData = { from: string; to: string };

export type GetCurrenciesData = {
  native?: boolean;
  enabled?: boolean;
  merchant_pay?: boolean;
  merchant_receive?: boolean;
  kind?: CurrencyKind;
};

export enum CurrencyKind {
  FIAT = 'fiat',
  CRYPTO = 'crypto'
}
