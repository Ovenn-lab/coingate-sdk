"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderClient extends CoinGateClient {
    constructor(apiKey) {
        super();
        this.apiKey = apiKey;
        this.setApiKey(apiKey);
    }
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }
    getOrder(id) {
        return this.sendPostRequest(this.apiKey, "order/:id", { id });
    }
}
exports.default = OrderClient;
// NOTE:
// apiKey settinama laikyti ne kiekvienoj orderClient, paymentClient ir t.t., o mesti i CoinGateClient
