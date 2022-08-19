import { AbstractService } from "../Abstract/Abstract.service";
import { CoinGateClient } from "../Client/CoinGate.client";

export class PaymentGatewayClient extends CoinGateClient {
  private abstractService: AbstractService;

  constructor() {
    super();
    this.abstractService = new AbstractService();
  }

  public createOrder() {
    // POST
    // orders
  }

  public checkout() {
    // POST
    // orders/:id/checkout
  }

  public getOrder() {
    // GET
    // orders/:id
  }

  public listOrders() {
    // GET
    // orders
  }
}
