"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const _Modules_1 = require("./Modules");
const _Exception_1 = require("./Exception");
const types_1 = require("./Modules/Client/types");
const types_2 = require("./types");
class Client extends _Modules_1.AbstractService {
    constructor(apiKey, useSandboxEnv) {
        super();
        this.apiKey = apiKey;
        this.useSandboxEnv = useSandboxEnv;
        this.config = Object.assign(Object.assign({}, this.getDefaultConfig(useSandboxEnv)), {
            apiKey: apiKey || null,
            enviroment: useSandboxEnv ? types_2.EnviromentEnum.SANDBOX : types_2.EnviromentEnum.LIVE
        });
        this.validateConfig();
        const { apiBase } = this.config;
        this.prepareModules(apiBase);
        this.clients = [this.public, this.paymentGateway, this.refunds];
        this.setApiKey(this.config.apiKey);
    }
    getAppInfo() {
        return this.appInfo;
    }
    getApiKey() {
        return this.config.apiKey;
    }
    getEnviroment() {
        return this.config.enviroment;
    }
    getDefaultConfig(useSandboxEnv) {
        return {
            apiKey: null,
            apiBase: useSandboxEnv
                ? types_1.BaseUrlEnum.SANDBOX_DEFAULT_API_BASE
                : types_1.BaseUrlEnum.DEFAULT_API_BASE,
            enviroment: types_2.EnviromentEnum.LIVE
        };
    }
    prepareModules(apiBase) {
        this.public = new _Modules_1.PublicClient(apiBase);
        this.refunds = new _Modules_1.RefundsClient(apiBase);
        this.paymentGateway = new _Modules_1.PaymentGatewayClient(apiBase);
    }
    testConnection(apiKey) {
        return this.public.test(apiKey);
    }
    validateConfig(config) {
        const { apiBase, apiKey, enviroment } = config || this.config;
        this.validateApiKey(apiKey);
        if (typeof apiBase !== 'string') {
            throw new _Exception_1.InvalidArgumentException('apiBase must be a string');
        }
        if (![types_2.EnviromentEnum.LIVE, types_2.EnviromentEnum.SANDBOX].includes(enviroment)) {
            throw new _Exception_1.InvalidArgumentException(`Environment does not exist. Available environments: ${Object.values(types_2.EnviromentEnum).join(', ')}`);
        }
    }
    setApiKey(apiKey) {
        const config = Object.assign(Object.assign({}, this.config), { apiKey });
        this.validateConfig(config);
        this.config = config;
        this.clients.forEach((client) => client.setApiKey(this.config.apiKey));
    }
    setEnviroment(enviroment) {
        const config = Object.assign(Object.assign({}, this.config), { enviroment: enviroment });
        this.validateConfig(config);
        this.config = config;
        this.setBaseUrlByEnv(this.config.enviroment);
    }
    setBaseUrlByEnv(enviroment) {
        this.clients.forEach((client) => {
            switch (enviroment) {
                case types_2.EnviromentEnum.SANDBOX:
                    return client.setBaseUrl(types_1.BaseUrlEnum.SANDBOX_DEFAULT_API_BASE);
                case types_2.EnviromentEnum.LIVE:
                default:
                    return client.setBaseUrl(types_1.BaseUrlEnum.DEFAULT_API_BASE);
            }
        });
    }
    setAppInfo({ name, version }) {
        this.appInfo = { name: name.trim(), version: version === null || version === void 0 ? void 0 : version.trim() };
        this.clients.forEach((client) => client.setAppInfo({ name, version }));
    }
}
exports.Client = Client;
