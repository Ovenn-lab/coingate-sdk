import faker from 'faker';

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
