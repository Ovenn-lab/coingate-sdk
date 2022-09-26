import {
  PaymentGatewayClient,
  PublicClient,
  RefundsClient,
  AbstractService
} from '#Modules';
import { InvalidArgumentException } from '#Exception';
import { BaseUrlEnum } from '#Modules/Client/types';

import { AppInfo, ConfigType, EnviromentEnum } from './types';

export class Client extends AbstractService {
  private clients: [PublicClient, PaymentGatewayClient, RefundsClient];

  private config: ConfigType;

  private appInfo: AppInfo | undefined;

  public public!: PublicClient;

  public paymentGateway!: PaymentGatewayClient;

  public refunds!: RefundsClient;

  constructor(
    protected apiKey?: string | null,
    protected useSandboxEnv?: boolean | null
  ) {
    super();
    this.config = {
      ...this.getDefaultConfig(useSandboxEnv),
      ...{
        apiKey: apiKey || null,
        enviroment: useSandboxEnv ? EnviromentEnum.SANDBOX : EnviromentEnum.LIVE
      }
    };

    this.validateConfig();

    const { apiBase } = this.config;

    this.prepareModules(apiBase);
    this.clients = [this.public, this.paymentGateway, this.refunds];
    this.setApiKey(this.config.apiKey);
  }

  public getAppInfo() {
    return this.appInfo;
  }

  public getApiKey() {
    return this.config.apiKey;
  }

  public getEnviroment() {
    return this.config.enviroment;
  }

  private getDefaultConfig(useSandboxEnv?: boolean | null) {
    return {
      apiKey: null,
      apiBase: useSandboxEnv
        ? BaseUrlEnum.SANDBOX_DEFAULT_API_BASE
        : BaseUrlEnum.DEFAULT_API_BASE,
      enviroment: EnviromentEnum.LIVE
    };
  }

  private prepareModules(apiBase: string) {
    this.public = new PublicClient(apiBase);
    this.refunds = new RefundsClient(apiBase);
    this.paymentGateway = new PaymentGatewayClient(apiBase);
  }

  public testConnection(apiKey: string) {
    return this.public.test(apiKey);
  }

  private validateConfig(config?: ConfigType) {
    const { apiBase, apiKey, enviroment } = config || this.config;

    this.validateApiKey(apiKey);

    if (typeof apiBase !== 'string') {
      throw new InvalidArgumentException('apiBase must be a string');
    }

    if (![EnviromentEnum.LIVE, EnviromentEnum.SANDBOX].includes(enviroment)) {
      throw new InvalidArgumentException(
        `Environment does not exist. Available environments: ${Object.values(
          EnviromentEnum
        ).join(', ')}`
      );
    }
  }

  public setApiKey(apiKey: string | null) {
    const config = { ...this.config, apiKey };
    this.validateConfig(config);
    this.config = config;

    this.clients.forEach((client) => client.setApiKey(this.config.apiKey));
  }

  public setEnviroment(enviroment: EnviromentEnum | string) {
    const config = { ...this.config, enviroment: enviroment as EnviromentEnum };

    this.validateConfig(config);
    this.config = config;
    this.setBaseUrlByEnv(this.config.enviroment);
  }

  private setBaseUrlByEnv(enviroment: EnviromentEnum) {
    this.clients.forEach((client) => {
      switch (enviroment) {
        case EnviromentEnum.SANDBOX:
          return client.setBaseUrl(BaseUrlEnum.SANDBOX_DEFAULT_API_BASE);
        case EnviromentEnum.LIVE:
        default:
          return client.setBaseUrl(BaseUrlEnum.DEFAULT_API_BASE);
      }
    });
  }

  public setAppInfo({ name, version }: AppInfo) {
    this.appInfo = { name: name.trim(), version: version?.trim() };
    this.clients.forEach((client) => client.setAppInfo({ name, version }));
  }

  /**
   * Set request timeout
   * @param {number} timeout
   */
  public setRequestTimeout(timeout: number) {
    this.clients.forEach((client) => client.setRequestTimeout(timeout));
  }
}
