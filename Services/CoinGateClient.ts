import axios, { AxiosInstance, AxiosResponse } from "axios";

class CoinGateClient {
  static VERSION = "4.1.0";

  protected coinGateUrl: "https://api.coingate.com/v2/";

  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: this.coinGateUrl,
    });
  }

  sendPostRequest(apiKey: string, path: string, params: object) {
    // this.client.post();
  }

  sendGetRequest(apiKey: string, path: string, params: object) {
    // this.client.get()
  }
}
