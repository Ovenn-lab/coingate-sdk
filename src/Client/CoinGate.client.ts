import { AbstractService } from '../Modules/Utils/Utils.service';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {
  BadAuthToken,
  BadRequest,
  InternalServerError,
  NotFound,
  OrderIsNotValid,
  OrderNotFound,
  RateLimitException,
  RefundIsNotValid,
  Unauthorized,
  UnknownApiErrorException,
  UnprocessableEntity
} from '../Exception';
import { Get } from './types';

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
          Authorization: `${this.apiKey}`
        }
      });

      return data;
    } catch (e) {
      this.handleErrorResponse(e as AxiosError);
    }
  }

  protected async get({ path, params, apiKey }: Get) {
    try {
      const { data } = await this.client.get(this.baseUrl + path, {
        params,
        headers: {
          Authorization: `${apiKey || this.apiKey}`
        }
      });
      return data;
    } catch (e) {
      this.handleErrorResponse(e as AxiosError);
    }
  }

  private handleErrorResponse({ response }: AxiosError) {
    const {
      status,
      data: { reason }
    } = response as AxiosResponse;

    if (status === 400) {
      throw BadRequest.factory(response!, status);
    } else if (status === 401) {
      switch (reason) {
        case 'BadAuthToken':
          throw BadAuthToken.factory(response!, status);
        default:
          throw Unauthorized.factory(response!, status);
      }
    } else if (status === 404) {
      switch (reason) {
        case 'OrderNotFound':
          throw OrderNotFound.factory(response!, status);
        default:
          throw NotFound.factory(response!, status);
      }
    } else if (status === 422) {
      switch (reason) {
        case 'OrderNotFound':
          throw OrderNotFound.factory(response!, status);
        case 'OrderIsNotValid':
          throw OrderIsNotValid.factory(response!, status);
        case 'RefundIsNotValid':
          throw RefundIsNotValid.factory(response!, status);
        default:
          throw UnprocessableEntity.factory(response!, status);
      }
    } else if (status === 429) {
      throw RateLimitException.factory(response!, status);
    } else if ([500, 504].includes(status)) {
      throw InternalServerError.factory(response!, status);
    }

    throw UnknownApiErrorException.factory(response!, status);
  }
}
