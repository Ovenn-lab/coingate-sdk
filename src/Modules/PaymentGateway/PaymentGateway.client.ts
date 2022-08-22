import { CoinGateClient } from "../../Client/CoinGate.client";
import { CheckoutBody, CreateOrderBody, ListOrdersData } from "./types";

export class PaymentGatewayClient extends CoinGateClient {
  constructor() {
    super();
  }

  public async createOrder(body: CreateOrderBody) {
    return this.sendPostRequest("orders/", body);
  }

  public checkout(id: number, body: CheckoutBody) {
    const path = this.buildPath({
      path: "orders/:id/checkout",
      params: { id },
    });
    return this.sendPostRequest(path, body);
  }

  public getOrder(id: number) {
    const path = this.buildPath({
      path: "orders/:id/",
      params: { id },
    });
    return this.sendGetRequest(path);
  }

  public async listOrders(params?: ListOrdersData) {
    return this.sendGetRequest("orders/", params);
  }
}
