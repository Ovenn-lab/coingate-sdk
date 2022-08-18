import { PublicClient } from "./Modules/Public/Public.client";

class Client {
  protected publicClient: PublicClient = new PublicClient();
  // protected paymentGateway: PaymentGatewayClient = new PaymentGatewayClient();

  constructor(protected apiKey: string | null) {
    this.setApiKey(apiKey);
  }

  setApiKey(apiKey) {
    // this.paymentGateway = this.paymentGateway.setApiKey(apiKey)
    // Su visais kitais clientais tas pats
  }
}

export { Client, PublicClient };
