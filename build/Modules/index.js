'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CoinGateClient =
  exports.AbstractService =
  exports.RefundsClient =
  exports.PublicClient =
  exports.orderClient =
    void 0;
var order_client_1 = require('./order/order.client');
Object.defineProperty(exports, 'orderClient', {
  enumerable: true,
  get: function () {
    return order_client_1.orderClient;
  }
});
var Public_client_1 = require('./Public/Public.client');
Object.defineProperty(exports, 'PublicClient', {
  enumerable: true,
  get: function () {
    return Public_client_1.PublicClient;
  }
});
var Refunds_client_1 = require('./Refunds/Refunds.client');
Object.defineProperty(exports, 'RefundsClient', {
  enumerable: true,
  get: function () {
    return Refunds_client_1.RefundsClient;
  }
});
var Abstract_service_1 = require('./AbstractService/Abstract.service');
Object.defineProperty(exports, 'AbstractService', {
  enumerable: true,
  get: function () {
    return Abstract_service_1.AbstractService;
  }
});
var CoinGate_client_1 = require('./Client/CoinGate.client');
Object.defineProperty(exports, 'CoinGateClient', {
  enumerable: true,
  get: function () {
    return CoinGate_client_1.CoinGateClient;
  }
});
