import { InvalidArgumentException } from './Exception';
import { PaymentGatewayClient, PublicClient, RefundsClient } from './Modules';
import { AppInfo, ConfigType, EnviromentEnum } from './types';

export class BaseClient {
  private DEFAULT_API_BASE = 'https://api.coingate.com';

  private SANDBOX_DEFAULT_API_BASE = 'https://api-sandbox.coingate.com';

  private clients: [PublicClient, PaymentGatewayClient, RefundsClient];

  private config: ConfigType;

  private appInfo: AppInfo | undefined;

  public public: PublicClient;

  public paymentGateway: PaymentGatewayClient;

  public refunds: RefundsClient;

  constructor(
    protected apiKey: string | null,
    protected useSandboxEnv?: boolean
  ) {
    this.config = {
      ...this.getDefaultConfig(useSandboxEnv),
      ...{
        apiKey: apiKey,
        enviroment: useSandboxEnv ? EnviromentEnum.SANDBOX : EnviromentEnum.LIVE
      }
    } as ConfigType;

    this.validateConfig(this.config);

    const { apiBase } = this.config;

    //  issikelti i set modules methoda ar kazkas tokio
    // ZODZIU, CIA NEISEJO SU ARRAY PADARYT IR JEI ISKELIU I KITA METHODA, TADA VIRSUJE BRAUKIA KAD CONSTRUCTORIUI NEASIGNINTA
    this.public = new PublicClient(apiBase);
    this.refunds = new RefundsClient(apiBase);
    this.paymentGateway = new PaymentGatewayClient(apiBase);

    this.clients = [this.public, this.paymentGateway, this.refunds];
    this.setApiKey(apiKey);
  }

  public setApiKey(apiKey: string | null) {
    this.validateConfig({ ...this.config, apiKey });
    this.config = { ...this.config, apiKey };

    this.clients.forEach((client) => client.setApiKey(this.config.apiKey));
  }

  public setEnviroment(enviroment: EnviromentEnum) {
    this.validateConfig({ ...this.config, enviroment });
    this.config = { ...this.config, enviroment };

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

  private getDefaultConfig(useSandboxEnv?: boolean) {
    return {
      apiKey: null,
      apiBase: useSandboxEnv
        ? this.SANDBOX_DEFAULT_API_BASE
        : this.DEFAULT_API_BASE,
      enviroment: EnviromentEnum.LIVE
    };
  }

  testConnection(apiKey: string) {
    return this.public.test(apiKey);
  }

  private validateConfig({ apiBase, apiKey, enviroment }: ConfigType) {
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
      throw new InvalidArgumentException('api_base must be a string');
    }

    if (![EnviromentEnum.LIVE, EnviromentEnum.SANDBOX].includes(enviroment)) {
      throw new InvalidArgumentException(
        'Environment does not exist. Available environments: live, sandbox.'
      );
    }
  }

  public getAppInfo() {
    return this.appInfo;
  }

  public setAppInfo({ name, version }: AppInfo) {
    this.appInfo = { name: name.trim(), version: version?.trim() };
    this.clients.forEach((client) => client.setAppInfo({ name, version }));
  }
}
