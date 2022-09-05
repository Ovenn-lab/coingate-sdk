import axios, { AxiosError, AxiosInstance } from 'axios';

import { AbstractService } from '../Modules/AbstractService/Abstract.service';
import { handleErrorResponse } from '../Exception';

import { GetRequestType } from './types';

export class CoinGateClient extends AbstractService {
  private client: AxiosInstance;

  private apiKey: string | null;

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

  public setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async post(path: string, body: object) {
    try {
      const { data } = await this.client.post(this.baseUrl + path, body, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return data;
    } catch (e) {
      handleErrorResponse(e as AxiosError);
    }
  }

  protected async get({ path, params, apiKey }: GetRequestType) {
    try {
      const { data } = await this.client.get(this.baseUrl + path, {
        params,
        headers: {
          Authorization: `Bearer ${apiKey || this.apiKey}`,
        },
      });
      return data;
    } catch (e) {
      handleErrorResponse(e as AxiosError);
    }
  }
}
