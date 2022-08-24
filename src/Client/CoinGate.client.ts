import { AbstractService } from "../Modules/Utils/Utils.service";
import axios, { AxiosError, AxiosInstance } from "axios";
import { apiErrorException } from "../Exception/ApiErrorException";

export class CoinGateClient extends AbstractService {
  static VERSION = "4.1.0";

  private client: AxiosInstance;

  protected apiKey: string | null;

  constructor(baseUrl: string) {
    super();
    this.client = axios.create({
      baseURL: baseUrl,
    });
    this.apiKey = null;
  }

  public setApiKey(apiKey: string | null) {
    this.apiKey = apiKey;
  }

  protected async sendPostRequest(path: string, body: object) {
    try {
      const { data } = await this.client.post(path, body, {
        headers: {
          Authorization: `${this.apiKey}`,
        },
      });

      return data;
    } catch (e) {
      return apiErrorException(e as AxiosError);
    }
  }

  protected async sendGetRequest(path: string, params?: object) {
    try {
      const { data } = await this.client.get(path, {
        params,
        headers: {
          Authorization: `${this.apiKey}`,
        },
      });
      return data;
    } catch (e) {
      return apiErrorException(e as AxiosError);
    }
  }
}
