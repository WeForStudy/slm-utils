"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MirrorCheck_1 = require("./MirrorCheck");
class Util {
    /**
     *
     * @param {Object} previous lower priority
     * @param {Object} nextObj higher priority
     */
    static merge(previous, nextObj) {
        if (!MirrorCheck_1.MirrorCheck.isObject(previous) || !MirrorCheck_1.MirrorCheck.isObject(nextObj)) {
            throw new Error('Parameters must be two Object!');
        }
        return Object.assign({}, previous, nextObj);
    }
}
exports.Util = Util;
