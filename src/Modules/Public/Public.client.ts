import { CoinGateClient } from '../../Client/CoinGate.client';

import { CurrencyKind, GetCurrenciesData } from './types';

export class PublicClient extends CoinGateClient {
  public getExchangeRate(from: string, to: string) {
    const path = this.buildPath({
      path: '/v2/rates/merchant/:from/:to',
      params: { from, to }
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
      kind: CurrencyKind.CRYPRO,
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

  public async test(apiKey: string): Promise<boolean> {
    try {
      await this.get({ path: '/v2/auth/test', apiKey: `Bearer ${apiKey}` });

      return true;
    } catch {
      return false;
    }
  }
}
