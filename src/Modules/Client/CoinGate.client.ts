import axios, { AxiosInstance } from "axios";
import { getRequestData, RequestEnum } from "./types";

export class CoinGateClient {
  static VERSION = "4.1.0";

  protected coinGateUrl = "https://api.coingate.com/v2/";

  private client: AxiosInstance;

  protected apiKey: string | null;

  constructor() {
    this.client = axios.create({
      baseURL: this.coinGateUrl,
    });
    this.apiKey = null;
  }

  public co(krcTest: string) {
    console.log(this.apiKey, krcTest);
  }

  public setApiKey(apiKey: string | null) {
    this.apiKey = apiKey;
  }

  public sendPostRequest(path: string, body: object, params?: object) {
    this.client.post(path);
  }

  public async sendGetRequest({ path, params }: getRequestData) {
    const { data } = await this.client.get(path, { params });

    return data;
  }

  public sendRequest(
    request: RequestEnum,
    apiKey: string,
    path: string,
    body?: object,
    params?: object
  ) {}
}
