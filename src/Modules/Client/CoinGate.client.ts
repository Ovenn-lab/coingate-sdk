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
  /**
   * @description Coingate-sdk version
   */
  private VERSION = '1.0.0';

  /**
   * @description Axios instance
   */
  private client: AxiosInstance;

  /**
   * @description api key for requests
   */
  private apiKey: string | null;

  /**
   * @description base url
   */
  protected baseUrl: string;

  /**
   * @description App information set by user
   */
  protected appInfo: AppInfo | undefined;

  /** @constructor */
  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
    this.client = axios.create();
    this.apiKey = null;
  }

  /**
   *
   * @param {string|null} apiKey
   */
  public setApiKey(apiKey: string | null) {
    this.validateApiKey(apiKey);
    this.apiKey = apiKey;
  }

  /**
   *
   * @param {BaseUrlEnum} baseUrl
   */
  public setBaseUrl(baseUrl: BaseUrlEnum) {
    this.baseUrl = baseUrl;
  }

  /**
   *
   * @param {AppInfo} appInfo
   */
  public setAppInfo({ name, version }: AppInfo) {
    this.appInfo = { name, version };
  }

  /**
   *
   * @param {string} path
   * @param {CreateOrderRefundBody|CreateOrderBody|CheckoutBody} body
   * @returns {Promise}
   */
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

  /**
   *
   * @param {GetRequestType} params
   * @returns {Promise}
   */
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

  /**
   *
   * @param {RequestTypeEnum} requestType
   * @param {string} apiKey
   * @returns headers
   */
  private getDefaultHeaders(requestType: RequestTypeEnum, apiKey?: string) {
    let headers: HeadersType;

    // if (requestType === RequestTypeEnum.POST) {
    //   headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   };
    // }

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
