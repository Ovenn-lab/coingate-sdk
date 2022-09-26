import { PaymentParamType } from '../../Modules/order/types';
import {
  GetCurrenciesData,
  GetExchangeRateData,
  SeparatorType
} from '../../Modules/Public/types';
import { RefundParamsType } from '../../Modules/Refunds/types';
export declare type BuildPathInput = {
  path: string;
  params?:
    | GetExchangeRateData
    | GetCurrenciesData
    | PaymentParamType
    | SeparatorType
    | RefundParamsType;
};
