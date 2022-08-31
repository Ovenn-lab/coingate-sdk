import { CoinGateClient } from '../../Client/CoinGate.client';

import { GetCurrenciesData } from './types';

export class PublicClient extends CoinGateClient {
  public getExchangeRate(options?: { from: string; to: string }) {
    const path = this.buildPath({
      path: '/v2/rates/merchant/',
      pathEnd: ':from/:to',
      params: options
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

  public getCurrencies(params: GetCurrenciesData) {
    return this.get({ path: '/v2/currencies/', params });
  }

  public platforms(enabled?: 'true' | 'false') {
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
