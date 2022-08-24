import { CoinGateClient } from "../../Client/CoinGate.client";
import { getCurrenciesData, getExchangeRateData } from "./types";

export class PublicClient extends CoinGateClient {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public async getExchangeRate(options?: { from: string; to: string }) {
    const path = this.buildPath({
      path: "v2/rates/merchant/",
      pathEnd: ":from/:to",
      params: options,
    });
    return await this.sendGetRequest(path);
  }

  public listExchangeRates() {
    return this.sendGetRequest("v2/rates/");
  }

  public ping() {
    return this.sendGetRequest("v2/ping/");
  }

  public ipAddresses(separator?: string) {
    return this.sendGetRequest("v2/ips-v4/", { separator });
  }

  public async getCurrencies(params: getCurrenciesData) {
    return this.sendGetRequest("v2/currencies/", params);
  }

  public async platforms(enabled?: "true" | "false") {
    return this.sendGetRequest("v2/currencies/", { enabled });
  }
}
