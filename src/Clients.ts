import { PaymentGatewayClient, PublicClient, RefundsClient } from "./Modules";
export class Client {
  static VERSION = "4.1.0";

  protected DEFAULT_API_BASE = "https://api.coingate.com";

  protected SANDBOX_DEFAULT_API_BASE = "https://api-sandbox.coingate.com";

  public public: PublicClient;

  public paymentGateway: PaymentGatewayClient;

  public refunds: RefundsClient;

  private clients: [PublicClient, PaymentGatewayClient, RefundsClient];

  constructor(
    protected apiKey: string | null,
    protected useSandboxEnv?: boolean
  ) {
    const baseUrl = useSandboxEnv
      ? this.SANDBOX_DEFAULT_API_BASE
      : this.DEFAULT_API_BASE;
    this.validateApiKey(apiKey);
    this.public = new PublicClient(baseUrl);
    this.refunds = new RefundsClient(baseUrl);
    this.paymentGateway = new PaymentGatewayClient(baseUrl);
    this.clients = [this.public, this.paymentGateway, this.refunds];
    this.setApiKey(`Bearer ${apiKey}`);
  }

  setApiKey(apiKey: string | null) {
    this.clients.forEach((client) => client.setApiKey(apiKey));
  }

  setEnviroment(enviroment: "live" | "sandbox") {
    if (enviroment === "sandbox") {
      this.clients.forEach((client) =>
        client.setClientEnviroment(this.SANDBOX_DEFAULT_API_BASE)
      );
    }
    if (enviroment === "live") {
      this.clients.forEach((client) =>
        client.setClientEnviroment(this.DEFAULT_API_BASE)
      );
    }
  }

  testConnection(apiKey: string) {
    return this.public.test(apiKey);
  }

  private validateApiKey(apiKey: string | null) {
    if (apiKey !== null) {
      if (typeof apiKey !== "string") {
        throw new Error("Api key must be null or a string");
      }

      if (apiKey.length === 0) {
        throw new Error("Api key cannot be empty string");
      }

      if (/\s/.test(apiKey)) {
        throw new Error("Api key cannot contain whitespace");
      }
    }
  }
}
