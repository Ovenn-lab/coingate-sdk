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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinGateClient = void 0;
const axios_1 = __importDefault(require("axios"));
const Abstract_service_1 = require("../../Modules/AbstractService/Abstract.service");
const Exception_1 = require("../../Exception");
const types_1 = require("./types");
class CoinGateClient extends Abstract_service_1.AbstractService {
    /** @constructor */
    constructor(baseUrl) {
        super();
        /**
         * @description Coingate-sdk version
         */
        this.VERSION = '1.0.0';
        this.baseUrl = baseUrl;
        this.client = axios_1.default.create();
        this.apiKey = null;
    }
    /**
     *
     * @param {string|null} apiKey
     */
    setApiKey(apiKey) {
        this.validateApiKey(apiKey);
        this.apiKey = apiKey;
    }
    /**
     *
     * @param {BaseUrlEnum} baseUrl
     */
    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }
    /**
     *
     * @param {AppInfo} appInfo
     */
    setAppInfo({ name, version }) {
        this.appInfo = { name, version };
    }
    /**
     *
     * @param {string} path
     * @param {CreateOrderRefundBody|CreateOrderBody|CheckoutBody} body
     * @returns {Promise}
     */
    post(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.client.post(this.baseUrl + path, body, {
                    headers: this.getDefaultHeaders(types_1.RequestTypeEnum.POST)
                });
                return data;
            }
            catch (e) {
                (0, Exception_1.handleErrorResponse)(e);
            }
        });
    }
    /**
     *
     * @param {GetRequestType} params
     * @returns {Promise}
     */
    get({ path, params, apiKey }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.client.get(this.baseUrl + path, {
                    params,
                    headers: this.getDefaultHeaders(types_1.RequestTypeEnum.GET, apiKey)
                });
                return data;
            }
            catch (e) {
                (0, Exception_1.handleErrorResponse)(e);
            }
        });
    }
    /**
     *
     * @param {RequestTypeEnum} requestType
     * @param {string} apiKey
     * @returns headers
     */
    getDefaultHeaders(requestType, apiKey) {
        let headers;
        // if (requestType === RequestTypeEnum.POST) {
        //   headers = {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   };
        // }
        if (this.apiKey) {
            headers = Object.assign({ Authorization: `Bearer ${apiKey || this.apiKey}` }, headers);
        }
        if (this.appInfo) {
            headers = Object.assign({ 'User-Agent': `Coingate/v2 (Node.js library v ${this.VERSION}, ${this.appInfo.name} ${this.appInfo.version ? 'v ' + this.appInfo.version : ''})` }, headers);
        }
        else {
            headers = Object.assign({ 'User-Agent': `Coingate/v2 (Node.js library v ${this.VERSION})` }, headers);
        }
        return headers;
    }
}
exports.CoinGateClient = CoinGateClient;
