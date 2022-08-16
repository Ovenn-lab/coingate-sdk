export default class OrderClient extends CoinGateClient {
  constructor(protected apiKey: string | null) {
    super();
    this.setApiKey(apiKey);
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  getOrder(id: string) {
    return this.sendPostRequest(this.apiKey, "order/:id", { id });
  }
}

// NOTE:
// apiKey settinama laikyti ne kiekvienoj orderClient, paymentClient ir t.t., o mesti i CoinGateClient
