import { Client } from '../src';

import { mockConfig } from './Mocks';

describe('Client', () => {
  let client: Client;
  let validateConfigSpy;

  describe('setApiKey method', () => {
    beforeEach(() => {
      client = new Client(null, true);
      validateConfigSpy = jest
        .spyOn(client, 'validateConfig')
        .mockReturnValue(undefined);
    });

    test('should set api key if its matching criteria', () => {
      const result = client.setApiKey(mockConfig.apiKey);

      expect(result).toBe(undefined);
      expect(validateConfigSpy).toHaveBeenCalledTimes(1);
      expect(validateConfigSpy).toHaveBeenCalledWith(mockConfig);
    });

    test('should throw an error if apiKey contains whitespaces', () => {
      const result = () => client.setApiKey(` ${mockConfig.apiKey} `);

      expect(result).toThrow('apiKey cannot contain whitespace');
      expect(validateConfigSpy).toHaveBeenCalledTimes(1);
      expect(validateConfigSpy).toHaveBeenCalledWith({
        ...mockConfig,
        apiKey: ` ${mockConfig.apiKey} `
      });
    });

    test('should throw an error if apiKey is an empty string', () => {
      const result = () => client.setApiKey('');

      expect(result).toThrow('apiKey cannot be empty string');

      expect(validateConfigSpy).toHaveBeenCalledTimes(1);
      expect(validateConfigSpy).toHaveBeenCalledWith({
        ...mockConfig,
        apiKey: ''
      });
    });
  });

  describe('setEnviroment method', () => {
    beforeEach(() => {
      client = new Client(null, true);
      validateConfigSpy = jest.spyOn(client, 'validateConfig');
    });

    test('should set new enviroment if everything is ok', () => {
      const setBaseUrlByEnvSpy = jest
        .spyOn(client, 'setBaseUrlByEnv')
        .mockReturnValue(undefined);

      const result = client.setEnviroment(mockConfig.enviroment);

      expect(result).toBe(undefined);
      expect(validateConfigSpy).toHaveBeenCalledTimes(1);
      expect(validateConfigSpy).toHaveBeenCalledWith({
        ...mockConfig,
        apiKey: null
      });
      expect(setBaseUrlByEnvSpy).toHaveBeenCalledTimes(1);
      expect(setBaseUrlByEnvSpy).toHaveBeenCalledWith(mockConfig.enviroment);
    });

    test('should throw error if enviroment is not: live, sandbox', () => {
      const result = () => client.setEnviroment('wrong');

      expect(result).toThrow(
        'Environment does not exist. Available environments: live, sandbox'
      );
      expect(validateConfigSpy).toHaveBeenCalledTimes(1);
      expect(validateConfigSpy).toHaveBeenCalledWith({
        ...mockConfig,
        apiKey: null,
        enviroment: 'wrong'
      });
    });
  });

  describe('getApiKey method', () => {
    beforeAll(() => {
      client = new Client(mockConfig.apiKey);
    });

    test('should return apiKey', () => {
      const result = client.getApiKey();

      expect(result).toBe(mockConfig.apiKey);
    });
  });

  describe('getEnviroment method', () => {
    beforeAll(() => {
      client = new Client(null, true);
    });
    test('should return current enviroment', () => {
      const result = client.getEnviroment();

      expect(result).toBe(mockConfig.enviroment);
    });
  });
});
