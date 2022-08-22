import { CoinGateClient } from "../../Client/CoinGate.client";
import { getCurrenciesData, getExchangeRateData } from "./types";

export class PublicClient extends CoinGateClient {
  constructor() {
    super();
  }

  public async getExchangeRate(options?: { from: string; to: string }) {
    const path = this.buildPath({
      path: "rates/merchant/",
      pathEnd: ":from/:to",
      params: options,
    });
    return await this.sendGetRequest(path);
  }

  public listExchangeRates() {
    return this.sendGetRequest("rates/");
  }

  public ping() {
    return this.sendGetRequest("ping/");
  }

  public ipAddresses(separator?: string) {
    return this.sendGetRequest("ips-v4/", { separator });
  }

  public async getCurrencies(params: getCurrenciesData) {
    return this.sendGetRequest("currencies/", params);
  }

  public async platforms(enabled?: "true" | "false") {
    return this.sendGetRequest("currencies/", { enabled });
  }
}
