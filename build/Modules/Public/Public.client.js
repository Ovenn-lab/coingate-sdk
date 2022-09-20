"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicClient = void 0;
const CoinGate_client_1 = require("../../Modules/Client/CoinGate.client");
const types_1 = require("./types");
class PublicClient extends CoinGate_client_1.CoinGateClient {
    getExchangeRate(params) {
        const path = this.buildPath({
            path: '/v2/rates/merchant/:from/:to',
            params
        });
        return this.get({ path });
    }
    listExchangeRates() {
        return this.get({ path: '/v2/rates/' });
    }
    ping() {
        return this.get({ path: '/v2/ping/' });
    }
    ipAddresses(separator) {
        return this.get({ path: '/v2/ips-v4/', params: { separator } });
    }
    getCurrencies(params) {
        return this.get({
            path: '/v2/currencies/',
            params
        });
    }
    getCheckoutCurrencies() {
        return this.getCurrencies({
            kind: types_1.CurrencyKindEnum.CRYPTO,
            native: true,
            merchant_pay: true
        });
    }
    getMerchantPayCurrencies(kind) {
        return this.getCurrencies({
            kind,
            native: false,
            merchant_pay: true
        });
    }
    getMerchantPayoutCurrencies(kind) {
        return this.getCurrencies({
            kind,
            native: false,
            merchant_pay: false,
            merchant_receive: true
        });
    }
    getPlatforms(enabled) {
        return this.get({
            path: '/v2/currencies/',
            params: { enabled: enabled ? 'true' : 'false' }
        });
    }
    test(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.get({ apiKey, path: '/v2/auth/test' });
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
}
exports.PublicClient = PublicClient;
