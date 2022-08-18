import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getRequestData, RequestEnum } from "../../Services/types";

export class CoinGateClient {
  static VERSION = "4.1.0";

  protected coinGateUrl = "https://api.coingate.com/v2/";

  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: this.coinGateUrl,
    });
  }

  public sendPostRequest(
    apiKey: string,
    path: string,
    body: object,
    params?: object
  ) {
    this.client.post(path);
  }

  public async sendGetRequest({ apiKey, path, params }: getRequestData) {
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
