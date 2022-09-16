import { CoinGateClient } from '#Modules/Client/CoinGate.client';

import {
  CurrencyKindEnum,
  GetCurrenciesData,
  GetExchangeRateData
} from './types';

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
      kind: CurrencyKindEnum.CRYPTO,
      native: true,
      merchant_pay: true
    });
  }

  public getMerchantPayCurrencies(kind?: CurrencyKindEnum) {
    return this.getCurrencies({
      kind,
      native: false,
      merchant_pay: true
    });
  }

  public getMerchantPayoutCurrencies(kind?: CurrencyKindEnum) {
    return this.getCurrencies({
      kind,
      native: false,
      merchant_pay: false,
      merchant_receive: true
    });
  }

  public getPlatforms(enabled?: boolean) {
    return this.get({
      path: '/v2/currencies/',
      params: { enabled: enabled ? 'true' : 'false' }
    });
  }

  public async test(apiKey: string): Promise<boolean> {
    try {
      await this.get({ apiKey, path: '/v2/auth/test' });

      return true;
    } catch {
      return false;
    }
  }
}
