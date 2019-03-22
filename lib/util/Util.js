"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mirror_1 = require("./Mirror");
class Util {
    /**
     *
     * @param {Object} previous lower priority
     * @param {Object} nextObj higher priority
     */
    static merge(previous, nextObj) {
        if (!Mirror_1.Mirror.isObject(previous) || !Mirror_1.Mirror.isObject(nextObj)) {
            throw new Error('Parameters must be two Object!');
        }
        return Object.assign({}, previous, nextObj);
    }
}
exports.Util = Util;
