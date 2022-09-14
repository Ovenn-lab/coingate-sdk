import faker from 'faker';

import { EnviromentEnum } from '../src/types';
import { BaseUrlEnum } from '../src/Modules/Client/types';

export const mockConfig = {
  enviroment: EnviromentEnum.SANDBOX,
  apiKey: faker.datatype.hexaDecimal(30),
  apiBase: BaseUrlEnum.SANDBOX_DEFAULT_API_BASE
};
