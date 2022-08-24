import { CoinGateClient } from "../../Client/CoinGate.client";
import { CheckoutBody, CreateOrderBody, ListOrdersData } from "./types";

export class PaymentGatewayClient extends CoinGateClient {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public async createOrder(body: CreateOrderBody) {
    return this.sendPostRequest("v2/orders/", body);
  }

  public checkout(id: number, body: CheckoutBody) {
    const path = this.buildPath({
      path: "v2/orders/:id/checkout",
      params: { id },
    });
    return this.sendPostRequest(path, body);
  }

  public getOrder(id: number) {
    const path = this.buildPath({
      path: "v2/orders/:id/",
      params: { id },
    });
    return this.sendGetRequest(path);
  }

  public async listOrders(params?: ListOrdersData) {
    return this.sendGetRequest("v2/orders/", params);
  }
}
