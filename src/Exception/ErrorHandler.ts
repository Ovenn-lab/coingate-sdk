import { AxiosError, AxiosResponse } from 'axios';

import { ErrorReasonEnum, HttpStatusEnum } from './types';
import {
  BadAuthToken,
  BadRequest,
  NotFound,
  OrderIsNotValid,
  OrderNotFound,
  RefundIsNotValid,
  Unauthorized,
  UnprocessableEntity
} from './Api';
import { InternalServerError } from './InternalServerError';
import { RateLimitException } from './RateLimitException';
import { UnknownApiErrorException } from './UnknownApiErrorException';

export const handleErrorResponse = ({ response }: AxiosError) => {
  const {
    status,
    data: { reason }
  } = response as AxiosResponse;

  if (response) {
    if (status === HttpStatusEnum.BAD_REQUEST) {
      throw BadRequest.factory(response, status);
    } else if (status === HttpStatusEnum.NOT_AUTHORIZED) {
      switch (reason) {
        case ErrorReasonEnum.BAD_AUTH_TOKEN:
          throw BadAuthToken.factory(response, status);
        default:
          throw Unauthorized.factory(response, status);
      }
    } else if (status === HttpStatusEnum.NOT_FOUND) {
      switch (reason) {
        case ErrorReasonEnum.ORDER_NOT_FOUND:
          throw OrderNotFound.factory(response, status);
        default:
          throw NotFound.factory(response, status);
      }
    } else if (status === HttpStatusEnum.UNPROCESSABLE_ENTITY) {
      switch (reason) {
        case ErrorReasonEnum.ORDER_NOT_FOUND:
          throw OrderNotFound.factory(response, status);
        case ErrorReasonEnum.ORDER_IS_NOT_VALID:
          throw OrderIsNotValid.factory(response, status);
        case ErrorReasonEnum.REFUND_IS_NOT_VALID:
          throw RefundIsNotValid.factory(response, status);
        default:
          throw UnprocessableEntity.factory(response, status);
      }
    } else if (status === HttpStatusEnum.TOO_MANY_REQUESTS) {
      throw RateLimitException.factory(response, status);
    } else if (
      [
        HttpStatusEnum.ITERNAL_SERVER_ERROR,
        HttpStatusEnum.GATEWAY_TIMEOUT
      ].includes(status)
    ) {
      throw InternalServerError.factory(response, status);
    }

    throw UnknownApiErrorException.factory(response, status);
  }
};
