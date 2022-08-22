import { CoinGateClient } from "../../Client/CoinGate.client";
import { CreateOrderRefundBody } from "./types";

export class RefundsClient extends CoinGateClient {
  constructor() {
    super();
  }

  public createOrderRefund(order_id: number, body: CreateOrderRefundBody) {
    const path = this.buildPath({
      path: "orders/:order_id/refunds",
      params: { order_id },
    });
    return this.sendPostRequest(path, body);
  }

  public getOrderRefund(order_id: number, id: number) {
    const path = this.buildPath({
      path: "orders/:order_id/refunds/:id",
      params: { order_id, id },
    });
    return this.sendGetRequest(path);
  }

  public getOrderRefunds(order_id: number) {
    const path = this.buildPath({
      path: "orders/:order_id/refunds",
      params: { order_id },
    });
    console.log(path);
    return this.sendGetRequest(path);
  }

  public getRefunds() {
    return this.sendGetRequest("refunds");
  }
}
