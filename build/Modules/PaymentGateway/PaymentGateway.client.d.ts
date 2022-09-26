import { CoinGateClient } from '../../Modules/Client/CoinGate.client';
import { CheckoutBody, CreateOrderBody, ListOrdersData } from './types';
export declare class orderClient extends CoinGateClient {
  createOrder(body: CreateOrderBody): Promise<any>;
  checkout(id: number, body: CheckoutBody): Promise<any>;
  getOrder(id: number): Promise<any>;
  listOrders(params?: ListOrdersData): Promise<any>;
}
