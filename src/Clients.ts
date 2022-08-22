import { PaymentGatewayClient, PublicClient, RefundsClient } from "./Modules";
export class Client {
  public public: PublicClient = new PublicClient();

  public paymentGateway: PaymentGatewayClient = new PaymentGatewayClient();

  public refunds: RefundsClient = new RefundsClient();

  constructor(protected apiKey: string | null) {
    console.log(apiKey, "client");
    this.setApiKey(apiKey);
  }
  // masyva padaryt kad per visus eitu ir greit sudetu
  setApiKey(apiKey: string | null) {
    this.paymentGateway.setApiKey(apiKey);
    this.refunds.setApiKey(apiKey);
  }
}
