import { PaymentGatewayClient, PublicClient, RefundsClient, AbstractService } from './Modules';
import { AppInfo, EnviromentEnum } from './types';
export declare class Client extends AbstractService {
    protected apiKey?: string | null;
    protected useSandboxEnv?: boolean | null;
    private clients;
    private config;
    private appInfo;
    public: PublicClient;
    paymentGateway: PaymentGatewayClient;
    refunds: RefundsClient;
    constructor(apiKey?: string | null, useSandboxEnv?: boolean | null);
    getAppInfo(): AppInfo;
    getApiKey(): string;
    getEnviroment(): EnviromentEnum;
    private getDefaultConfig;
    private prepareModules;
    testConnection(apiKey: string): Promise<boolean>;
    private validateConfig;
    setApiKey(apiKey: string | null): void;
    setEnviroment(enviroment: EnviromentEnum | string): void;
    private setBaseUrlByEnv;
    setAppInfo({ name, version }: AppInfo): void;
    /**
     * Set request timeout
     * @param {number} timeout
     */
    setRequestTimeout(timeout: number): void;
}
