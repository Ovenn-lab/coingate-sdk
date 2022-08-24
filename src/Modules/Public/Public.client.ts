import { CoinGateClient } from "../../Client/CoinGate.client";
import { getCurrenciesData } from "./types";

export class PublicClient extends CoinGateClient {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public async getExchangeRate(options?: { from: string; to: string }) {
    const path = this.buildPath({
      path: "/v2/rates/merchant/",
      pathEnd: ":from/:to",
      params: options,
    });
    return await this.get({ path });
  }

  public listExchangeRates() {
    return this.get({ path: "/v2/rates/" });
  }

  public ping() {
    return this.get({ path: "/v2/ping/" });
  }

  public ipAddresses(separator?: string) {
    return this.get({ path: "/v2/ips-v4/", params: { separator } });
  }

  public async getCurrencies(params: getCurrenciesData) {
    return this.get({ path: "/v2/currencies/", params });
  }

  public async platforms(enabled?: "true" | "false") {
    return this.get({ path: "/v2/currencies/", params: { enabled } });
  }

  public async test(apiKey: string) {
    return this.get({ path: "/v2/auth/test", apiKey: `Bearer ${apiKey}` });
  }
}
