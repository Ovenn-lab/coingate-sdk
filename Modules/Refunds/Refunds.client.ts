import { AbstractService } from "../Abstract/Abstract.service";

export class RefundsClient {
  private abstractService: AbstractService;

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
