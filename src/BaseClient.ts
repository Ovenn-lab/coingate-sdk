import { InvalidArgumentException } from './Exception';
import { ConfigType } from '#types';
import { PaymentGatewayClient, PublicClient, RefundsClient } from './Modules';
export class BaseClient {
  static VERSION = '4.1.0';

  protected DEFAULT_API_BASE = 'https://api.coingate.com';

  protected SANDBOX_DEFAULT_API_BASE = 'https://api-sandbox.coingate.com';

  public public: PublicClient;

  public paymentGateway: PaymentGatewayClient;

  public refunds: RefundsClient;

  private clients: [PublicClient, PaymentGatewayClient, RefundsClient];

  constructor(
    protected apiKey: string | null,
    protected useSandboxEnv?: boolean
  ) {
    const config = {
      ...this.getDefaultConfig(),
      ...{ api_key: apiKey, enviroment: useSandboxEnv ? 'live' : 'sandbox' }
    } as ConfigType;

    this.validateConfig(config);

    const baseUrl = useSandboxEnv
      ? this.SANDBOX_DEFAULT_API_BASE
      : this.DEFAULT_API_BASE;
    this.public = new PublicClient(baseUrl);
    this.refunds = new RefundsClient(baseUrl);
    this.paymentGateway = new PaymentGatewayClient(baseUrl);
    this.clients = [this.public, this.paymentGateway, this.refunds];
    this.setApiKey(`Bearer ${apiKey}`);
  }

  setApiKey(apiKey: string | null) {
    this.clients.forEach((client) => client.setApiKey(apiKey));
  }

  setEnviroment(enviroment: 'live' | 'sandbox') {
    if (enviroment === 'sandbox') {
      this.clients.forEach((client) =>
        client.setClientEnviroment(this.SANDBOX_DEFAULT_API_BASE)
      );
    }
    if (enviroment === 'live') {
      this.clients.forEach((client) =>
        client.setClientEnviroment(this.DEFAULT_API_BASE)
      );
    }
  }

  private getDefaultConfig() {
    return {
      api_key: null,
      api_base: this.DEFAULT_API_BASE,
      enviroment: 'live'
    };
  }

  testConnection(apiKey: string) {
    return this.public.test(apiKey);
  }

  private validateConfig({ api_base, api_key, enviroment }: ConfigType) {
    if (api_key !== null) {
      if (typeof api_key !== 'string') {
        throw new InvalidArgumentException('api_key must be null or a string');
      }

      if (api_key.length === 0) {
        throw new InvalidArgumentException('api_key cannot be empty string');
      }

      if (/\s/.test(api_key)) {
        throw new InvalidArgumentException('api_key cannot contain whitespace');
      }
    }

    if (typeof api_base !== 'string') {
      throw new InvalidArgumentException('api_base');
    }
    if (!['live', 'sandbox'].includes(enviroment)) {
      throw new InvalidArgumentException(
        'Environment does not exist. Available environments: live, sandbox.'
      );
    }
  }
}
