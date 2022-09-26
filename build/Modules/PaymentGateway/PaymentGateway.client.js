'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.orderClient = void 0;
const CoinGate_client_1 = require('../../Modules/Client/CoinGate.client');
class orderClient extends CoinGate_client_1.CoinGateClient {
  createOrder(body) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.post('/v2/orders/', body);
    });
  }
  checkout(id, body) {
    const path = this.buildPath({
      path: '/v2/orders/:id/checkout',
      params: { id }
    });
    return this.post(path, body);
  }
  getOrder(id) {
    const path = this.buildPath({
      path: '/v2/orders/:id/',
      params: { id }
    });
    return this.get({ path });
  }
  listOrders(params) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.get({ path: '/v2/orders/', params });
    });
  }
}
exports.orderClient = orderClient;
