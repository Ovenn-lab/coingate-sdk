import { CoinGateClient } from '#Modules/Client/CoinGate.client';

import { CreateOrderRefundBody } from './types';

export class RefundsClient extends CoinGateClient {
  /**
   * Creates refund for provided order
   *
   * @param {number} order_id
   * @param {CreateOrderRefundBody} body
   */
  public createOrderRefund(order_id: number, body: CreateOrderRefundBody) {
    const path = this.buildPath({
      path: '/v2/orders/:order_id/refunds',
      params: { order_id }
    });

    return this.post(path, body);
  }

  /**
   * Retrieving information of a specific refund by CoinGate order ID and refund ID.
   *
   * @param {number} order_id
   * @param {number} id
   */
  public getOrderRefund(order_id: number, id: number) {
    const path = this.buildPath({
      path: '/v2/orders/:order_id/refunds/:id',
      params: { order_id, id }
    });

    return this.get({ path });
  }

  /**
   * Retrieving all refunds of a specific order by CoinGate order ID.
   *
   * @param {number} order_id
   */
  public getOrderRefunds(order_id: number) {
    const path = this.buildPath({
      path: '/v2/orders/:order_id/refunds',
      params: { order_id }
    });

    return this.get({ path });
  }

  /**
   * Retrieving all refunds of a specific order by CoinGate order ID.
   *
   */
  public getRefunds() {
    return this.get({ path: '/v2/refunds' });
  }
}
