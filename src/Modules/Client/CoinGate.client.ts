import axios, { AxiosError, AxiosInstance } from 'axios';

import { AbstractService } from '#Modules/AbstractService/Abstract.service';
import { handleErrorResponse } from '../../Exception';
import { CreateOrderRefundBody } from '#/Modules/Refunds/types';
import { CheckoutBody, CreateOrderBody } from '#/Modules/PaymentGateway/types';
import { AppInfo } from '#types';

import {
  BaseUrlEnum,
  GetRequestType,
  HeadersType,
  RequestTypeEnum
} from './types';

export class CoinGateClient extends AbstractService {
  private VERSION = '1.0.0';

  private client: AxiosInstance;

  private apiKey: string | null;

  protected baseUrl: string;

  protected appInfo: AppInfo | undefined;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
    this.client = axios.create();
    this.apiKey = null;
  }

  public setApiKey(apiKey: string | null) {
    this.validateApiKey(apiKey);
    this.apiKey = apiKey;
  }

  public setBaseUrl(baseUrl: BaseUrlEnum) {
    this.baseUrl = baseUrl;
  }

  public setAppInfo({ name, version }: AppInfo) {
    this.appInfo = { name, version };
  }

  protected async post(
    path: string,
    body: CreateOrderRefundBody | CreateOrderBody | CheckoutBody
  ) {
    try {
      const { data } = await this.client.post(this.baseUrl + path, body, {
        headers: this.getDefaultHeaders(RequestTypeEnum.POST)
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
        headers: this.getDefaultHeaders(RequestTypeEnum.GET, apiKey)
      });

      return data;
    } catch (e) {
      handleErrorResponse(e as AxiosError);
    }
  }

  private getDefaultHeaders(requestType: RequestTypeEnum, apiKey?: string) {
    let headers: HeadersType;

    if (requestType === RequestTypeEnum.POST) {
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
    }

    if (this.apiKey) {
      headers = {
        Authorization: `Bearer ${apiKey || this.apiKey}`,
        ...headers
      };
    }

    if (this.appInfo) {
      headers = {
        'User-Agent': `Coingate/v2 (Node.js library v ${this.VERSION}, ${
          this.appInfo.name
        } ${this.appInfo.version ? 'v ' + this.appInfo.version : ''})`,
        ...headers
      };
    } else {
      headers = {
        'User-Agent': `Coingate/v2 (Node.js library v ${this.VERSION})`,
        ...headers
      };
    }

    return headers;
  }
}
