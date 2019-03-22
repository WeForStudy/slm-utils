"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../util");
class BaseStorage {
    constructor(storage) {
        this.instance = null;
        this.instance = storage;
    }
    /**
     * @description get the value which storaged by key
     * @param {string} key required, the key of the value
     * @param {string} type optional, the type of the value
     * @returns {any} can return any type
     */
    get(key, type) {
        let _val = this.instance.getItem(key);
        // if type is not a json, return the original value
        if (type && type.toLocaleUpperCase() !== 'OBJECT') {
            return _val;
        }
        try {
            // parse the val
            _val = JSON.parse(_val);
        }
        catch (e) { } // eslint-disable-line
        return _val;
    }
    /**
     * @description set the value into storage with key
     * @param {string} key required, the key of the value
     * @param {any} value required, the value
     * @returns {boolean}, which determine whether execute success or not
     */
    set(key, value) {
        try {
            const _val = util_1.Mirror.isObject(value) ? JSON.stringify(value) : value;
            this.instance.setItem(key, _val);
            return true;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    /**
     * @description check the value which storaged by key
     * @param {string} key required, the key of the value
     * @returns {boolean}, which determine whether exist or not
     */
    check(key) {
        if (!key) {
            throw new Error('Must have a key to check object exist!');
        }
        const obj = this.get(key);
        if (util_1.Mirror.isUndefined(obj)) {
            return false;
        }
        return true;
    }
    /**
     * @description remove the value which storage by key
     * @param {string} key required, the key of the value
     * @returns {boolean}, which determine whether execute success or not
     */
    remove(key) {
        this.instance.remove(key);
        return true;
    }
    /**
     * @description remove all the value that storaged in storage
     * @returns {boolean}, which determine whether execute success or not
     */
    clearStorage() {
        this.instance.clear();
        return true;
    }
}
exports.BaseStorage = BaseStorage;
