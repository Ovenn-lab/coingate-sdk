import { InvalidArgumentException } from './Exception';
import { PaymentGatewayClient, PublicClient, RefundsClient } from './Modules';
import { ConfigType, EnviromentEnum } from './types';
export class BaseClient {
  static VERSION = '4.1.0';

  private DEFAULT_API_BASE = 'https://api.coingate.com';

  private SANDBOX_DEFAULT_API_BASE = 'https://api-sandbox.coingate.com';

  public public: PublicClient;

  public paymentGateway: PaymentGatewayClient;

  public refunds: RefundsClient;

  private clients: [PublicClient, PaymentGatewayClient, RefundsClient];

  private config: ConfigType;

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

    this.public = new PublicClient(apiBase);
    this.refunds = new RefundsClient(apiBase);
    this.paymentGateway = new PaymentGatewayClient(apiBase);
    this.clients = [this.public, this.paymentGateway, this.refunds];
    this.setModulesApiKey(apiKey);
  }

  setModulesApiKey(apiKey: string | null) {
    this.clients.forEach((client) => client.setApiKey(apiKey));
  }

  setEnviroment(enviroment: EnviromentEnum) {
    this.clients.forEach((client) => {
      switch (enviroment) {
        case EnviromentEnum.SANDBOX:
          return client.setBaseUrl(this.SANDBOX_DEFAULT_API_BASE);
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
}
