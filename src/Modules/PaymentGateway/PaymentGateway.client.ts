import { CoinGateClient } from '#Modules/Client/CoinGate.client';

import { CheckoutBody, CreateOrderBody, ListOrdersData } from './types';

export class PaymentGatewayClient extends CoinGateClient {
  public async createOrder(body: CreateOrderBody) {
    return this.post('/v2/orders/', body);
  }

  public checkout(id: number, body: CheckoutBody) {
    const path = this.buildPath({
      path: '/v2/orders/:id/checkout',
      params: { id }
    });

    return this.post(path, body);
  }

  public getOrder(id: number) {
    const path = this.buildPath({
      path: '/v2/orders/:id/',
      params: { id }
    });

    return this.get({ path });
  }

  public async listOrders(params?: ListOrdersData) {
    return this.get({ path: '/v2/orders/', params });
  }
}
