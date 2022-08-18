import { AbstractService } from "../Abstract/Abstract.service";
import { CoinGateClient } from "../Client/CoinGate.client";

export class RefundsClient extends CoinGateClient {
  private abstractService: AbstractService;

  constructor() {
    super();
    this.abstractService = new AbstractService();
  }

  public createOrderRefund() {
    // POST
    // orders/:order_id/refunds
  }

  public getOrderRefund() {
    // GET
    // orders/:order_id/refunds/:id
  }

  public getOrderRefunds() {
    // GET
    // orders/:order_id/refunds
  }

  public getRefunds() {
    // GET
    // refunds
  }
}
