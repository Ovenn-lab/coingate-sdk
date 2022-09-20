import { PublicClient } from '../src/Modules';
import { CurrencyKindEnum } from '../src/Modules/Public/types';
import {
  mockConfig,
  mockExchangeRateData,
  mockGetCurrenciesData,
  mockSeparator
} from './Mocks';

describe('Public client', () => {
  let publicClient;
  let getSpy;

  beforeEach(() => {
    publicClient = new PublicClient();
    getSpy = jest.spyOn(publicClient, 'get');
  });

  describe('getExchangeRate method', () => {
    test('should build path and call get method', () => {
      const buildPathSpy = jest.spyOn(publicClient, 'buildPath');

      const result = publicClient.getExchangeRate(mockExchangeRateData);

      expect(result).toBeDefined();
      expect(buildPathSpy).toBeCalledTimes(1);
      expect(buildPathSpy).toBeCalledWith({
        path: '/v2/rates/merchant/:from/:to',
        params: mockExchangeRateData
      });
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: `/v2/rates/merchant/${mockExchangeRateData.from}/${mockExchangeRateData.to}`
      });
    });
  });

  describe('listExchangeRates method', () => {
    test('should call get with path /v2/rates/', () => {
      const result = publicClient.listExchangeRates();

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({ path: '/v2/rates/' });
    });
  });

  describe('ping method', () => {
    test('should call get with path /v2/ping/', () => {
      const result = publicClient.ping();

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({ path: '/v2/ping/' });
    });
  });

  describe('ipAddresses method', () => {
    test('should call get with path /v2/ips-v4/ and pass separator param', () => {
      const result = publicClient.ipAddresses(mockSeparator);

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/ips-v4/',
        params: { separator: mockSeparator }
      });
    });

    test('should call get with path /v2/ips-v4/ and pass undefined separator param when it is not provided', () => {
      const result = publicClient.ipAddresses();

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/ips-v4/',
        params: { separator: undefined }
      });
    });
  });

  describe('getCurrencies methods', () => {
    test('should call get with path /v2/currencies/ and provided params', () => {
      const result = publicClient.getCurrencies(mockGetCurrenciesData);

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/currencies/',
        params: mockGetCurrenciesData
      });
    });

    test('should call get with path /v2/currencies/ and undefined params when it is not provided', () => {
      const result = publicClient.getCurrencies();

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/currencies/',
        params: undefined
      });
    });
  });

  describe('getCheckoutCurrencies method', () => {
    test('should call getCurrencies method with params for checkout currencies', () => {
      const getCurrenciesSpy = jest.spyOn(publicClient, 'getCurrencies');

      const result = publicClient.getCheckoutCurrencies();

      expect(result).toBeDefined();
      expect(getCurrenciesSpy).toBeCalledTimes(1);
      expect(getCurrenciesSpy).toBeCalledWith({
        kind: CurrencyKindEnum.CRYPTO,
        native: true,
        merchant_pay: true
      });
    });
  });

  describe('getMerchantPayCurrencies method', () => {
    test('should call getCurrencies method with params for merchant pay currencies and selected currency kind', () => {
      const getCurrenciesSpy = jest.spyOn(publicClient, 'getCurrencies');

      const result = publicClient.getMerchantPayCurrencies(
        CurrencyKindEnum.FIAT
      );

      expect(result).toBeDefined();
      expect(getCurrenciesSpy).toBeCalledTimes(1);
      expect(getCurrenciesSpy).toBeCalledWith({
        kind: CurrencyKindEnum.FIAT,
        native: false,
        merchant_pay: true
      });
    });

    test('should call getCurrencies method with params for merchant pay currencies', () => {
      const getCurrenciesSpy = jest.spyOn(publicClient, 'getCurrencies');

      const result = publicClient.getMerchantPayCurrencies();

      expect(result).toBeDefined();
      expect(getCurrenciesSpy).toBeCalledTimes(1);
      expect(getCurrenciesSpy).toBeCalledWith({
        kind: undefined,
        native: false,
        merchant_pay: true
      });
    });
  });

  describe('getMerchantPayoutCurrencies method', () => {
    test('should call getCurrencies method with params for checkout currencies and selected currency kind', () => {
      const getCurrenciesSpy = jest.spyOn(publicClient, 'getCurrencies');

      const result = publicClient.getMerchantPayoutCurrencies(
        CurrencyKindEnum.CRYPTO
      );

      expect(result).toBeDefined();
      expect(getCurrenciesSpy).toBeCalledTimes(1);
      expect(getCurrenciesSpy).toBeCalledWith({
        kind: CurrencyKindEnum.CRYPTO,
        native: false,
        merchant_pay: false,
        merchant_receive: true
      });
    });

    test('should call getCurrencies method with params for checkout currencies', () => {
      const getCurrenciesSpy = jest.spyOn(publicClient, 'getCurrencies');

      const result = publicClient.getMerchantPayoutCurrencies();

      expect(result).toBeDefined();
      expect(getCurrenciesSpy).toBeCalledTimes(1);
      expect(getCurrenciesSpy).toBeCalledWith({
        kind: undefined,
        native: false,
        merchant_pay: false,
        merchant_receive: true
      });
    });
  });

  describe('getPlatforms method', () => {
    test('should call get with path /v2/currencies/ and provided params', () => {
      const result = publicClient.getPlatforms(true);

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/currencies/',
        params: { enabled: 'true' }
      });
    });
  });

  describe('test method', () => {
    test('should call get with path /v2/auth/test and provided apiKey', () => {
      const result = publicClient.test(mockConfig.apiKey);

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/auth/test',
        apiKey: mockConfig.apiKey
      });
    });
  });
});
