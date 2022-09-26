"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const _Modules_1 = require("./Modules");
const _Exception_1 = require("./Exception");
const types_1 = require("./Modules/Client/types");
const types_2 = require("./types");
class Client extends _Modules_1.AbstractService {
    /** @constructor */
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
        this.services = [this.public, this.order, this.refunds];
        this.setApiKey(this.config.apiKey);
    }
    /**
     * @returns {AppInfo|null} app information
     */
    getAppInfo() {
        return this.appInfo;
    }
    /**
     * @returns {string|null} api key or null
     */
    getApiKey() {
        return this.config.apiKey;
    }
    /**
     * @returns {EnviromentEnum} enviroment
     */
    getEnviroment() {
        return this.config.enviroment;
    }
    /**
     *
     * @param {boolean|null} useSandboxEnv
     * @returns {ConfigType} config
     */
    getDefaultConfig(useSandboxEnv) {
        return {
            apiKey: null,
            apiBase: useSandboxEnv
                ? types_1.BaseUrlEnum.SANDBOX_DEFAULT_API_BASE
                : types_1.BaseUrlEnum.DEFAULT_API_BASE,
            enviroment: types_2.EnviromentEnum.LIVE
        };
    }
    /**
     * Prepares all modules
     * @param {string} apiBase
     */
    prepareModules(apiBase) {
        this.public = new _Modules_1.PublicService(apiBase);
        this.refunds = new _Modules_1.RefundsService(apiBase);
        this.order = new _Modules_1.orderService(apiBase);
    }
    /**
     * Tests api connection
     * @param {string} apiKey
     * @returns {boolean} true / false
     */
    testConnection(apiKey) {
        return this.public.test(apiKey);
    }
    /**
     * Config validator
     * @param {ConfigType} config
     */
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
    /**
     *
     * @param {string|null} apiKey
     */
    setApiKey(apiKey) {
        const config = Object.assign(Object.assign({}, this.config), { apiKey });
        this.validateConfig(config);
        this.config = config;
        this.services.forEach((client) => client.setApiKey(this.config.apiKey));
    }
    /**
     *
     * @param {EnviromentEnum|string} enviroment
     */
    setEnviroment(enviroment) {
        const config = Object.assign(Object.assign({}, this.config), { enviroment: enviroment });
        this.validateConfig(config);
        this.config = config;
        this.setBaseUrlByEnv(this.config.enviroment);
    }
    /**
     *
     * @param {EnviromentEnum} enviroment
     */
    setBaseUrlByEnv(enviroment) {
        this.services.forEach((client) => {
            switch (enviroment) {
                case types_2.EnviromentEnum.SANDBOX:
                    return client.setBaseUrl(types_1.BaseUrlEnum.SANDBOX_DEFAULT_API_BASE);
                case types_2.EnviromentEnum.LIVE:
                default:
                    return client.setBaseUrl(types_1.BaseUrlEnum.DEFAULT_API_BASE);
            }
        });
    }
    /**
     *
     * @param {AppInfo} appInfo
     */
    setAppInfo({ name, version }) {
        this.appInfo = { name: name.trim(), version: version === null || version === void 0 ? void 0 : version.trim() };
        this.services.forEach((client) => client.setAppInfo({ name, version }));
    }
}
exports.Client = Client;
