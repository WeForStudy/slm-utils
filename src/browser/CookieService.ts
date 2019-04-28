import { Mirror } from '../util/Mirror';

export class CookieService {
  private static instance = null; // private the intance case

  public static getInstance(): CookieService {
    if (!this.instance) {
      this.instance = new CookieService();
    }
    return this.instance;
  }

  /**
   * @description set the cookie
   * @param {*} key  cookie name
   * @param {*} value cookie value
   * @param {*} expires cookie expires time, unit is minute
   * @return the operation set right or wrong
   */
  set({ key, value }, opts) {
    const validKey: string[] = [
      'expires',
      'domain',
      'path',
    ];
    const initOpts = {
      // path: '/',
      expires: 5,
      // domain: window.location.hostname,
      ...opts,
    };
    try {
      // in case empty of params
      if (!key || !value) return false;
      // check the value whether is a Object or not
      let _val = Mirror.isObject(value) ? JSON.stringify(value) : value;
      const suffixArr = Object.keys(initOpts).map(key => {
        const flag: boolean = validKey.some(item => item === key);
        if (!flag) return null;
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
      }).filter(item => !!item);// to filter the null
      // to add an additional semi
      const suffix = suffixArr.length > 0 ? `;${suffixArr.join(';')}` : '';
      // encode the value in case of special character
      document.cookie = `${key}=${encodeURIComponent(_val)}${suffix}`;
      return true;
    } catch (err) {
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
  get(key, type = 'Json') {
    // if do not have cookie info, return empty string
    if (document.cookie.length === 0) return '';
    const name = `${key}=`;
    const cookieArray = document.cookie.split(';');
    let findOne = '';
    // let expires;
    cookieArray.some(item => {
      const each = item.trim();
      // console.log(`each is:${each}, cname is:${name}, index is: ${each.indexOf(name)}`);
      if (each.indexOf(name) === 0) {
        // decode the value, filter the speical character
        findOne = decodeURIComponent(each.substring(name.length, each.length));
        // expires =
        return true;
      }
      return false;
    });
    // in case of value is not a simple string
    if (type && type.toUpperCase() === 'JSON') {
      try {
        findOne = JSON.parse(findOne);
      } catch (err) { } // eslint-disable-line
    }
    return findOne;
  }


  /**
   * @description remove a cookie from document
   * @param {*} key the key of cookie
   */
  remove(key) {
    const isExist = this.check(key);
    if (isExist) {
      this.set({ key: name, value: ''}, {
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
  check(key) {
    if (!key) {
      throw new Error('Must have a key to check object exist!');
    }
    return document.cookie.includes(key);
  }

  /**
   * @description clear all the cookie info
   */
  clear() {
    document.cookie = '';
    return true;
  }
}
