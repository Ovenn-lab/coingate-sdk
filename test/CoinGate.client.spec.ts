import { CoinGateClient } from '../src/Modules';
import { BaseUrlEnum, RequestTypeEnum } from '../src/Modules/Client/types';

import { mockConfig } from './Mocks';

describe('CoinGate client', () => {
  let coinGateClient: CoinGateClient;
  let validateApiKeySpy;

  beforeEach(() => {
    coinGateClient = new CoinGateClient(BaseUrlEnum.SANDBOX_DEFAULT_API_BASE);
    validateApiKeySpy = jest.spyOn(coinGateClient, 'validateApiKey');
  });

  describe('setApiKey method', () => {
    test('should validate and set api key if it matches criteria', () => {
      const result = coinGateClient.setApiKey(mockConfig.apiKey);

      expect(result).toBe(undefined);
      expect(validateApiKeySpy).toHaveBeenCalledTimes(1);
      expect(validateApiKeySpy).toHaveBeenCalledWith(mockConfig.apiKey);
      expect(coinGateClient.apiKey).toBe(mockConfig.apiKey);
    });

    test('should throw an error if apiKey contains whitespace', () => {
      const result = () => coinGateClient.setApiKey(` ${mockConfig.apiKey} `);

      expect(result).toThrow('apiKey cannot contain whitespace');
      expect(validateApiKeySpy).toHaveBeenCalledTimes(1);
      expect(validateApiKeySpy).toHaveBeenCalledWith(` ${mockConfig.apiKey} `);
    });

    test('should throw an error if apiKey is empty string', () => {
      const result = () => coinGateClient.setApiKey('');

      expect(result).toThrow('apiKey cannot be empty string');
      expect(validateApiKeySpy).toHaveBeenCalledTimes(1);
      expect(validateApiKeySpy).toHaveBeenCalledWith('');
    });
  });

  describe('get method', () => {
    test('should send a get request via axios client', async () => {
      const getDefaultHeadersSpy = jest.spyOn(
        coinGateClient,
        'getDefaultHeaders'
      );
      const promise = await coinGateClient.get({ path: '' });

      expect(promise).toBeDefined();
      expect(getDefaultHeadersSpy).toHaveBeenCalledTimes(1);
      expect(getDefaultHeadersSpy).toHaveBeenCalledWith(
        RequestTypeEnum.GET,
        undefined
      );
    });
  });
});
