import { CoinGateClient } from "../Client/CoinGate.client";
import { AbstractService } from "../Abstract/Abstract.service";
import { getCurrenciesData, getExchangeRateData } from "./types";

export class PublicClient {
  private client: CoinGateClient;

  private abstractService: AbstractService;

  constructor() {
    this.client = new CoinGateClient();
    this.abstractService = new AbstractService();
  }

  // TODO:  reikia enuma arba kazka apsirasyt valiutom, USD, EUR, ETH etc.. kurios gali buti
  // kad neeitu paduoti random stringu per kuriuos susigadina req
  public async getExchangeRate(options?: { from: string; to: string }) {
    const path = this.abstractService.buildPath({
      path: "rates/merchant/",
      pathEnd: ":from/:to",
      params: options,
    });
    return await this.client.sendGetRequest({ path });
  }

  public listExchangeRates() {
    return this.client.sendGetRequest({ path: "rates/" });
  }

  public ping() {
    return this.client.sendGetRequest({ path: "ping/" });
  }

  public ipAddresses(separator?: string) {
    return this.client.sendGetRequest({
      path: "ips-v4/",
      params: { separator },
    });
  }

  public async getCurrencies(params: getCurrenciesData) {
    return this.client.sendGetRequest({
      params,
      path: "currencies/",
    });
  }

  public async platforms(enabled?: "true" | "false") {
    return this.client.sendGetRequest({
      path: "currencies/",
      params: { enabled },
    });
  }
}
