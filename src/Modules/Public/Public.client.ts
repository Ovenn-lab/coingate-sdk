import { CoinGateClient } from '#Modules/Client/CoinGate.client';

import { CurrencyKind, GetCurrenciesData, GetExchangeRateData } from './types';

export class PublicClient extends CoinGateClient {
  public getExchangeRate(params: GetExchangeRateData) {
    const path = this.buildPath({
      path: '/v2/rates/merchant/:from/:to',
      params
    });
    return this.get({ path });
  }

  public listExchangeRates() {
    return this.get({ path: '/v2/rates/' });
  }

  public ping() {
    return this.get({ path: '/v2/ping/' });
  }

  public ipAddresses(separator?: string) {
    return this.get({ path: '/v2/ips-v4/', params: { separator } });
  }

  public getCurrencies(params?: GetCurrenciesData) {
    return this.get({
      path: '/v2/currencies/',
      params
    });
  }

  public getCheckoutCurrencies() {
    return this.getCurrencies({
      kind: CurrencyKind.CRYPTO,
      native: true,
      merchant_pay: true
    });
  }

  public getMerchantPayCurrencies(kind?: CurrencyKind) {
    return this.getCurrencies({
      kind,
      native: false,
      merchant_pay: true
    });
  }

  public getMerchantPayoutCurrencies(kind?: CurrencyKind) {
    return this.getCurrencies({
      kind,
      native: false,
      merchant_pay: false,
      merchant_receive: true
    });
  }

  public getPlatforms(enabled?: 'true' | 'false') {
    return this.get({ path: '/v2/currencies/', params: { enabled } });
  }

  public async test(apiKey?: string | null): Promise<boolean> {
    try {
      await this.get({ path: '/v2/auth/test', apiKey: `Bearer ${apiKey}` });

      return true;
    } catch {
      return false;
    }
  }
}
