"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
class CookieService {
    /**
     * @description set the cookie
     * @param {*} key  cookie name
     * @param {*} value cookie value
     * @param {*} expires cookie expires time, unit is minute
     * @return the operation set right or wrong
     */
    setCookie({ key, value }, opts) {
        const validKey = [
            'expires',
            'domain',
            'path',
        ];
        const initOpts = Object.assign({ 
            // path: '/',
            expires: 5 }, opts);
        try {
            // in case empty of params
            if (!key || !value)
                return false;
            // check the value whether is a Object or not
            let _val = util_1.Mirror.isObject(value) ? JSON.stringify(value) : value;
            const suffixArr = Object.keys(initOpts).map(key => {
                const flag = validKey.some(item => item === key);
                if (!flag)
                    return null;
                if (Object.prototype.hasOwnProperty.call(initOpts, key)) {
                    let val = initOpts[key];
                    // special deal for expires-time
                    if (key === 'expires') {
                        const d = new Date();
                        d.setTime(d.getTime() + (val * 60 * 1000));
                        val = d.toDateString();
                    }
                    // return the combo str key=value
                    return `${key}=${val}`;
                }
                return null;
            }).filter(item => !!item); // to filter the null
            // to add an additional semi
            const suffix = suffixArr.length > 0 ? `;${suffixArr.join(';')}` : '';
            // encode the value in case of special character
            document.cookie = `${key}=${encodeURIComponent(_val)}${suffix}`;
            return true;
        }
        catch (err) {
            console.log(`occured error when set cookie: ${key}`);
            return false;
        }
    }
    /**
     * @description get the cookie value
     * @param {String} key the key of cookie
     * @param {String} type the type of cookie value
     * @returns {String} found the cookie value, otherwise return empty string
     */
    getCookie({ key, type = 'Json' }) {
        // if do not have cookie info, return empty string
        if (document.cookie.length === 0)
            return '';
        const name = `${key}=`;
        const cookieArray = document.cookie.split(';');
        let findOne = '';
        // let expires;
        cookieArray.some(item => {
            const each = item.trim();
            // console.log(`each is:${each}, cname is:${name}, index is: ${each.indexOf(name)}`);
            if (each.indexOf(name) === 0) {
                // decode the value, filter the speical character
                findOne = decodeURIComponent(each.substring(name.length, item.length));
                // expires =
                return true;
            }
            return false;
        });
        // in case of value is not a simple string
        if (type && type.toUpperCase() === 'JSON') {
            try {
                findOne = JSON.parse(findOne);
            }
            catch (err) { } // eslint-disable-line
        }
        return findOne;
    }
    /**
     * @description remove a cookie from document
     * @param {*} key the key of cookie
     */
    removeCookie(key) {
        const isExist = this.checkCookieExist(key);
        if (isExist) {
            this.setCookie({ key: name, value: '' }, {
                expires: -60,
            });
        }
        return true;
    }
    /**
     * @description check the cookie info whether exist or not
     * @param {String} key the key of cookie
     * @param {String} type the type of value, default is Json
     * @returns {Boolean} the status of cookie exist
     */
    checkCookieExist(key, type) {
        if (!key) {
            throw new Error('Must have a key to check object exist!');
        }
        const obj = this.getCookie({
            key,
            type,
        });
        if (util_1.Mirror.isUndefined(obj)) {
            return false;
        }
        return true;
    }
    /**
     * @description clear all the cookie info
     */
    clearAllCookies() {
        document.cookie = '';
        return true;
    }
}
exports.CookieService = CookieService;
