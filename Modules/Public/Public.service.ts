import { CoinGateClient } from "../Client/CoinGateClient";
import { AbstractService } from "../Order/Abstract/Abstract.service";
import { getCurrenciesData, getExchangeRateData } from "./types";

export class PublicService {
  private client: CoinGateClient;

  private abstractService: AbstractService;

  constructor() {
    this.client = new CoinGateClient();
    this.abstractService = new AbstractService();
  }

  // TODO:  reikia enuma arba kazka apsirasyt valiutom, USD, EUR, ETH etc.. kurios gali buti
  // kad neeitu paduoti random stringu per kuriuos susigadina req
  public async getExchangeRate(options?: { from: string; to: string }) {
    const path = this.abstractService.buildPath(
      "rates/merchant/",
      ":from/:to",
      options
    );
    const data = await this.client.sendGetRequest({ path });
    return data;
  }

  public async listExchangeRates() {
    const data = await this.client.sendGetRequest({ path: "rates/" });
    console.log(data);
  }

  public async ping() {
    const data = await this.client.sendGetRequest({ path: "ping/" });
    console.log(data);
  }

  public async ipAddresses(separator?: string) {
    const data = await this.client.sendGetRequest({
      path: "ips-v4/",
      params: { separator },
    });
    console.log(data);
  }

  public async getCurrencies(params: getCurrenciesData) {
    const data = await this.client.sendGetRequest({
      params,
      path: "currencies/",
    });
    console.log(data);
  }

  public async platforms(enabled?: "true" | "false") {
    const data = await this.client.sendGetRequest({
      path: "currencies/",
      params: { enabled },
    });
    console.log(data);
  }
}
