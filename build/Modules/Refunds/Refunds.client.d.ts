import { CoinGateClient } from '../../Modules/Client/CoinGate.client';
import { CreateOrderRefundBody } from './types';
export declare class RefundsClient extends CoinGateClient {
    createOrderRefund(order_id: number, body: CreateOrderRefundBody): Promise<any>;
    getOrderRefund(order_id: number, id: number): Promise<any>;
    getOrderRefunds(order_id: number): Promise<any>;
    getRefunds(): Promise<any>;
}
