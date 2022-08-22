import { AbstractService } from "../Modules/Utils/Utils.service";
import axios, { AxiosInstance } from "axios";

export class CoinGateClient extends AbstractService {
  static VERSION = "4.1.0";

  protected coinGateUrl = "https://api-sandbox.coingate.com/v2/";

  private client: AxiosInstance;

  protected apiKey: string | null;

  constructor() {
    super();
    this.client = axios.create({
      baseURL: this.coinGateUrl,
    });
    this.apiKey = null;
  }

  public setApiKey(apiKey: string | null) {
    this.apiKey = apiKey;
  }

  public async sendPostRequest(path: string, body: object) {
    try {
      const { data } = await this.client.post(path, body, {
        headers: {
          Authorization: `${this.apiKey}`,
        },
      });

      return data;
    } catch (e) {
      console.log(e);
    }
  }

  public async sendGetRequest(path: string, params?: object) {
    try {
      const { data } = await this.client.get(path, {
        params,
        headers: {
          Authorization: `${this.apiKey}`,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
