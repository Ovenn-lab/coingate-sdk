import { PaymentGatewayClient, PublicClient, RefundsClient } from '#Modules';
import { InvalidArgumentException } from '#Exception';

import { AppInfo, ConfigType, EnviromentEnum } from './types';

export class Client {
  private DEFAULT_API_BASE = 'https://api.coingate.com';

  private SANDBOX_DEFAULT_API_BASE = 'https://api-sandbox.coingate.com';

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
        ? this.SANDBOX_DEFAULT_API_BASE
        : this.DEFAULT_API_BASE,
      enviroment: EnviromentEnum.LIVE
    };
  }

  private prepareModules(apiBase: string) {
    this.public = new PublicClient(apiBase);
    this.refunds = new RefundsClient(apiBase);
    this.paymentGateway = new PaymentGatewayClient(apiBase);
  }

  public testConnection(apiKey?: string | null) {
    return this.public.test(apiKey);
  }

  private validateConfig(config?: ConfigType) {
    const { apiBase, apiKey, enviroment } = config || this.config;
    if (apiKey !== null) {
      if (typeof apiKey !== 'string') {
        throw new InvalidArgumentException('apiKey must be null or a string');
      }

      if (apiKey.length === 0) {
        throw new InvalidArgumentException('apiKey cannot be empty string');
      }

      if (/\s/.test(apiKey)) {
        throw new InvalidArgumentException('apiKey cannot contain whitespace');
      }
    }

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
          return client.setBaseUrl(this.SANDBOX_DEFAULT_API_BASE);
        case EnviromentEnum.LIVE:
        default:
          return client.setBaseUrl(this.DEFAULT_API_BASE);
      }
    });
  }

  public setAppInfo({ name, version }: AppInfo) {
    this.appInfo = { name: name.trim(), version: version?.trim() };
    this.clients.forEach((client) => client.setAppInfo({ name, version }));
  }
}
