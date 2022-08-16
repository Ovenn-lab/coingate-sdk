class Client {
  protected orders: OrderClient = new OrderClient();
  protected payments: PaymentsClient = new PaymentClient();

  constructor(protected apiKey: string | null) {
    this.setApiKey(apiKey);
  }

  setApiKey(apiKey) {
    this.orders = this.orders.setApiKey(apiKey);
    this.payments = this.payments.setApiKey(apiKey);
    // Su visais kitais clientais tas pats
  }
}

export { Client, OrderClient, PaymentsClient };
