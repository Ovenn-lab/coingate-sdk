import {
  BillingClient,
  LedgerClient,
  ApiApplicationsClient,
  PaymentGatewayClient,
  PublicClient,
  RefundsClient,
  WithdrawalsClient,
} from "./Modules";
import { CoinGateClient } from "./Modules/Client/CoinGate.client";
class Client {
  protected publicClient: PublicClient = new PublicClient();

  protected paymentGateway: PaymentGatewayClient = new PaymentGatewayClient();

  protected billingClient: BillingClient = new BillingClient();

  protected ledgerClient: LedgerClient = new LedgerClient();

  protected apiAppClient: ApiApplicationsClient = new ApiApplicationsClient();

  protected refundsClient: RefundsClient = new RefundsClient();

  protected withdrawalClient: WithdrawalsClient = new WithdrawalsClient();

  constructor(protected apiKey: string | null) {
    console.log(apiKey, "client");
    this.setApiKey(apiKey);
  }

  setApiKey(apiKey: string | null) {
    this.paymentGateway.setApiKey(apiKey);
    this.billingClient.setApiKey(apiKey);
    this.ledgerClient.setApiKey(apiKey);
    this.apiAppClient.setApiKey(apiKey);
    this.refundsClient.setApiKey(apiKey);
    this.withdrawalClient.setApiKey(apiKey);
    // logs
    this.withdrawalClient.co("withdraw");
    this.paymentGateway.co("payment");
    this.billingClient.co("billing");
    this.ledgerClient.co("ledger");
    this.apiAppClient.co("api");
    this.refundsClient.co("refund");
  }
}

export { Client, PublicClient };
