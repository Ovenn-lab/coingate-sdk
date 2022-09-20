"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundsClient = void 0;
const CoinGate_client_1 = require("../../Modules/Client/CoinGate.client");
class RefundsClient extends CoinGate_client_1.CoinGateClient {
    createOrderRefund(order_id, body) {
        const path = this.buildPath({
            path: '/v2/orders/:order_id/refunds',
            params: { order_id }
        });
        return this.post(path, body);
    }
    getOrderRefund(order_id, id) {
        const path = this.buildPath({
            path: '/v2/orders/:order_id/refunds/:id',
            params: { order_id, id }
        });
        return this.get({ path });
    }
    getOrderRefunds(order_id) {
        const path = this.buildPath({
            path: '/v2/orders/:order_id/refunds',
            params: { order_id }
        });
        return this.get({ path });
    }
    getRefunds() {
        return this.get({ path: '/v2/refunds' });
    }
}
exports.RefundsClient = RefundsClient;
