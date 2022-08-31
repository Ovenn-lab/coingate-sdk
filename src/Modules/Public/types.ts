export type getExchangeRateData = { from: string; to: string };

export type getCurrenciesData = {
  native: boolean;
  enabled: boolean;
  merchant_pay: boolean;
  merchant_receive: boolean;
  kind: 'fiat' | 'crypto';
};
