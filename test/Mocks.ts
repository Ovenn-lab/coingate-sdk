import faker from 'faker';

import { EnviromentEnum } from '../src/types';
import { BaseUrlEnum } from '../src/Modules/Client/types';
import { CurrencyKindEnum } from '../src/Modules/Public/types';

export const mockConfig = {
  enviroment: EnviromentEnum.SANDBOX,
  apiKey: faker.datatype.hexaDecimal(30),
  apiBase: BaseUrlEnum.SANDBOX_DEFAULT_API_BASE
};

export const mockWrongApiKeys = {
  keyWithWhitespace: ` ${mockConfig.apiKey}`,
  keyEmpty: ''
};

export const mockWrongEnviroment = 'local';

export const mockExchangeRateData = { from: 'USD', to: 'EUR' };

export const mockSeparator = '-';

export const mockGetCurrenciesData = {
  native: true,
  enabled: true,
  merchant_pay: true,
  merchant_receive: true,
  kind: CurrencyKindEnum.CRYPTO
};

export const mockOrderRefundData = {
  amount: faker.datatype.number(100),
  address: faker.random.words(2),
  currency_id: faker.datatype.number(100),
  platform_id: faker.datatype.number(100),
  reason: faker.random.words(2),
  email: faker.datatype.string(10),
  ledger_account_id: faker.datatype.string(10)
};

export const mockRefundsData = {
  order_id: faker.datatype.number(500),
  id: faker.datatype.number(500)
};

export const mockCreateOrderData = {
  price_amount: faker.datatype.number(500),
  price_currency: 'USD',
  receive_currency: 'BTC'
};

export const mockCheckoutData = {
  pay_currency: 'USD'
};

export const mockOrderId = faker.datatype.number(500);

export const mockListOrdersParams = {
  per_page: faker.datatype.number(10),
  page: faker.datatype.number(10),
  from: '2022-06-22',
  to: '2077-06-22'
};
