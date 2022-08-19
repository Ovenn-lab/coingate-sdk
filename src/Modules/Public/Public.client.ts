import { CoinGateClient } from "../Client/CoinGate.client";
import { AbstractService } from "../Abstract/Abstract.service";
import { getCurrenciesData, getExchangeRateData } from "./types";

export class PublicClient extends CoinGateClient {
  private abstractService: AbstractService;

  constructor() {
    super();
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
    return await this.sendGetRequest({ path });
  }

  public listExchangeRates() {
    return this.sendGetRequest({ path: "rates/" });
  }

  public ping() {
    return this.sendGetRequest({ path: "ping/" });
  }

  public ipAddresses(separator?: string) {
    return this.sendGetRequest({
      path: "ips-v4/",
      params: { separator },
    });
  }

  public async getCurrencies(params: getCurrenciesData) {
    return this.sendGetRequest({
      params,
      path: "currencies/",
    });
  }

  public async platforms(enabled?: "true" | "false") {
    return this.sendGetRequest({
      path: "currencies/",
      params: { enabled },
    });
  }
}
