import { CoinGateClient } from '#Modules/Client/CoinGate.client';

import { CheckoutBody, CreateOrderBody, ListOrdersData } from './types';

export class PaymentGatewayClient extends CoinGateClient {
  /**
   * Create order at CoinGate and redirect shopper to invoice (payment_url).
   *
   * @param  {CreateOrderBody} body
   * @returns order
   */
  public async createOrder(body: CreateOrderBody) {
    return this.post('/v2/orders/', body);
  }

  /**
   * @param {number} id
   * @param  {CheckoutBody} body
   * @returns order
   */
  public checkout(id: number, body: CheckoutBody) {
    const path = this.buildPath({
      path: '/v2/orders/:id/checkout',
      params: { id }
    });

    return this.post(path, body);
  }

  /**
   * Retrieving information of a specific order by CoinGate order ID.
   *
   * @param {number} id
   *  @returns
   */
  public getOrder(id: number) {
    const path = this.buildPath({
      path: '/v2/orders/:id/',
      params: { id }
    });

    return this.get({ path });
  }

  /**
   * Retrieving information of all placed orders.
   *
   * @param {ListOrdersData} params
   */
  public async listOrders(params?: ListOrdersData) {
    return this.get({ path: '/v2/orders/', params });
  }
}
