import { CoinGateClient } from '../../Modules/Client/CoinGate.client';
import { CurrencyKindEnum, GetCurrenciesData, GetExchangeRateData } from './types';
export declare class PublicClient extends CoinGateClient {
    getExchangeRate(params: GetExchangeRateData): Promise<any>;
    listExchangeRates(): Promise<any>;
    ping(): Promise<any>;
    ipAddresses(separator?: string): Promise<any>;
    getCurrencies(params?: GetCurrenciesData): Promise<any>;
    getCheckoutCurrencies(): Promise<any>;
    getMerchantPayCurrencies(kind?: CurrencyKindEnum): Promise<any>;
    getMerchantPayoutCurrencies(kind?: CurrencyKindEnum): Promise<any>;
    getPlatforms(enabled?: boolean): Promise<any>;
    test(apiKey: string): Promise<boolean>;
}
