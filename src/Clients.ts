import { PaymentGatewayClient, PublicClient, RefundsClient } from "./Modules";
export class Client {
  static VERSION = "4.1.0";

  protected DEFAULT_API_BASE = "https://api.coingate.com";

  protected SANDBOX_DEFAULT_API_BASE = "https://api-sandbox.coingate.com";

  public public: PublicClient;

  public paymentGateway: PaymentGatewayClient;

  public refunds: RefundsClient;

  constructor(protected apiKey: string | null, protected sandbox?: boolean) {
    const baseUrl = sandbox
      ? this.SANDBOX_DEFAULT_API_BASE
      : this.DEFAULT_API_BASE;

    this.validateApiKey(apiKey);
    this.public = new PublicClient(baseUrl);
    this.refunds = new RefundsClient(baseUrl);
    this.paymentGateway = new PaymentGatewayClient(baseUrl);
    this.setApiKey(apiKey);
  }
  // masyva padaryt kad per visus eitu ir greit sudetu | BET AR REIKIA KAI DU LIKO?????
  setApiKey(apiKey: string | null) {
    this.paymentGateway.setApiKey(apiKey);
    this.refunds.setApiKey(apiKey);
  }

  private validateApiKey(apiKey: string | null) {
    if (apiKey !== null) {
      if (typeof apiKey !== "string") {
        throw new Error("ff");
      }
    }
  }
}
