import { AbstractService } from '../../Modules/AbstractService/Abstract.service';
import { CreateOrderRefundBody } from '../../Modules/Refunds/types';
import { CheckoutBody, CreateOrderBody } from '../../Modules/PaymentGateway/types';
import { AppInfo } from '../../types';
import { BaseUrlEnum, GetRequestType } from './types';
export declare class CoinGateClient extends AbstractService {
    private VERSION;
    private client;
    private apiKey;
    private timeout;
    protected baseUrl: string;
    protected appInfo: AppInfo | undefined;
    constructor(baseUrl: string);
    /**
     * Set request timeout
     * @param {number} timeout
     */
    setTimeout(timeout: number): void;
    setApiKey(apiKey: string | null): void;
    setBaseUrl(baseUrl: BaseUrlEnum): void;
    setAppInfo({ name, version }: AppInfo): void;
    protected post(path: string, body: CreateOrderRefundBody | CreateOrderBody | CheckoutBody): Promise<any>;
    protected get({ path, params, apiKey }: GetRequestType): Promise<any>;
    private getDefaultHeaders;
}
