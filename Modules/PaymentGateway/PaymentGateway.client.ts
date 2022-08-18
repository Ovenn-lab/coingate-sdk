import { AbstractService } from "../Abstract/Abstract.service";

export class PaymentGatewayClient {
  private abstractService: AbstractService;

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
