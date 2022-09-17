import faker, { fake } from 'faker';

import { EnviromentEnum } from '../src/types';
import { BaseUrlEnum } from '../src/Modules/Client/types';
import { CurrencyKindEnum } from '../src/Modules/Public/types';

export const mockConfig = {
  enviroment: EnviromentEnum.SANDBOX,
  apiKey: faker.datatype.hexaDecimal(30),
  apiBase: BaseUrlEnum.SANDBOX_DEFAULT_API_BASE
};

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
