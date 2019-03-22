"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mirror_1 = require("./Mirror");
class ValidatorUtil {
    /**
     * @description private the constructor in case other new it
     */
    constructor() {
    }
    /**
     * @description get the instance of Validator
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new ValidatorUtil();
        }
        return this.instance;
    }
    /**
     * @description check string whether is a url or not
     * @param {String} str the string will be checked later
     * @returns {Boolean} the result
     */
    isUrl(str) {
        const reg = /(https|http):\/\//;
        return this.regTest(reg, str);
    }
    /**
     * @description inside method will be use in every method
     * @param {String} str the string will be checked later
     * @returns {Boolean} the result
     */
    regTest(reg, str) {
        return reg.test(str);
    }
    /**
     * @description check string whether is only a en char or not
     * @param {String} str the string will be checked later
     * @returns {Boolean} the result
     */
    onlyIncludeEn(str) {
        const reg = /[^a-zA-Z]/g;
        return this.regTest(reg, str);
    }
    /**
     * @description check string whether is Number or not
     * @param {String} str the string will be checked later
     * @returns {Boolean} the result
     */
    includeNumber(num) {
        return Mirror_1.Mirror.isNumber(num) && isNaN(num);
    }
    /**
     * @description check string whether include blank or not
     * @param {String} str the string will be checked later
     * @returns {Boolean} the result
     */
    includeBlank(str) {
        return this.regTest(/^\s+|\s+$/g, str);
    }
    /**
     * @description check string whether is special char or not
     * @param {String} str the string will be checked later
     * @returns {Boolean} the result
     */
    includeSpecialChar(str) {
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (this.regTest(regEn, str))
            return true;
        return this.regTest(regCn, str);
    }
    /**
     * @description check string whether include blank or not
     * @param {String} str the string will be checked later
     * @returns {Boolean} the result
     */
    includeEnlishAndChineseChar(str) {
        return this.regTest(/^[\u4e00-\u9fa5a-z]+$/gi, str);
    }
    /**
     * @description check string whether include special char or not
     * @param {String} str the string will be checked later
     * @returns {Boolean} the result
     */
    includeSpecCharAndExcludeSimpleChar(str) {
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, regCn = /[·！#￥（——）|《》【】[\]]/im; // exclude , 、“”‘’ 。 ？；：
        if (this.regTest(regEn, str))
            return true;
        return this.regTest(regCn, str);
    }
}
ValidatorUtil.instance = null;
exports.ValidatorUtil = ValidatorUtil;
