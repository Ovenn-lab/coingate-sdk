import { CoinGateClient } from '#Modules/Client/CoinGate.client';

import { CreateOrderRefundBody } from './types';

export class RefundsClient extends CoinGateClient {
  public createOrderRefund(order_id: number, body: CreateOrderRefundBody) {
    const path = this.buildPath({
      path: '/v2/orders/:order_id/refunds',
      params: { order_id }
    });

    return this.post(path, body);
  }

  public getOrderRefund(order_id: number, id: number) {
    const path = this.buildPath({
      path: '/v2/orders/:order_id/refunds/:id',
      params: { order_id, id }
    });

    return this.get({ path });
  }

  public getOrderRefunds(order_id: number) {
    const path = this.buildPath({
      path: '/v2/orders/:order_id/refunds',
      params: { order_id }
    });

    return this.get({ path });
  }

  public getRefunds() {
    return this.get({ path: '/v2/refunds' });
  }
}
