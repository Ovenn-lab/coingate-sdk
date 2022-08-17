import { CoinGateClient } from "../Client/CoinGateClient";
import { AbstractService } from "../Order/Abstract/Abstract.service";
import { getExchangeRateData } from "./types";

export class PublicService {
  private path = "rates/";

  private client: CoinGateClient;

  private abstractService: AbstractService;

  constructor() {
    this.client = new CoinGateClient();
    this.abstractService = new AbstractService();
  }

  // reikia enuma apsirasyt valiutom, USD, EUR, ETH etc.. kurios gali buti
  // kad neeitu paduoti random stringu per kuriuos susigadina req
  public async getExchangeRate(options?: { from: string; to: string }) {
    const path = this.abstractService.buildPath(
      this.path + "merchant/",
      ":from/:to",
      options
    );
    const data = await this.client.sendGetRequest({ path });
    console.log(data);
  }
}
