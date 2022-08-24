import { AbstractService } from "../Modules/Utils/Utils.service";
import axios, { AxiosError, AxiosInstance } from "axios";
import { ApiErrorException } from "../Exception/ApiErrorException";
import { Get } from "./types";

export class CoinGateClient extends AbstractService {
  private client: AxiosInstance;

  protected apiKey: string | null;

  protected baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
    this.client = axios.create();
    this.apiKey = null;
  }

  public setApiKey(apiKey: string | null) {
    this.apiKey = apiKey;
  }

  public setClientEnviroment(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async post(path: string, body: object) {
    try {
      const { data } = await this.client.post(this.baseUrl + path, body, {
        headers: {
          Authorization: `${this.apiKey}`,
        },
      });

      return data;
    } catch (e) {
      throw new ApiErrorException(e as AxiosError);
    }
  }

  protected async get({ path, params, apiKey }: Get) {
    try {
      const { data } = await this.client.get(this.baseUrl + path, {
        params,
        headers: {
          Authorization: `${apiKey || this.apiKey}`,
        },
      });
      return data;
    } catch (e) {
      throw new ApiErrorException(e as AxiosError);
    }
  }
}
