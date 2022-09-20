"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
const _Exception_1 = require("../../Exception");
class AbstractService {
    buildPath({ path, params }) {
        let newPath = path;
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                newPath = newPath.replace(`:${key}`, value);
            }
        }
        return newPath;
    }
    validateApiKey(apiKey) {
        if (apiKey !== null) {
            if (typeof apiKey !== 'string') {
                throw new _Exception_1.InvalidArgumentException('apiKey must be null or a string');
            }
            if (apiKey.length === 0) {
                throw new _Exception_1.InvalidArgumentException('apiKey cannot be empty string');
            }
            if (/\s/.test(apiKey)) {
                throw new _Exception_1.InvalidArgumentException('apiKey cannot contain whitespace');
            }
        }
    }
}
exports.AbstractService = AbstractService;
