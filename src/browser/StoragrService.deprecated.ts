import { Util } from '../util';
import { Mirror } from '../util';

export class StoragrService {
  private storage: object;
  constructor(storageObj) {
    // default storage is localStorage
    if (typeof window !== 'undefined') {
      this.storage = window.localStorage;
    }
    // if params exist， set the value to storage
    if (Mirror.isObject(storageObj)) {
      this.storage = storageObj;
    }
  }

  /**
   * @description set the value to the storage of browser
   * @param {Object} options key, value, 
   * @returns {Boolean} the flag idendify whether excuted succuess or not
   */
  setStorage(options) {
    // #TODO#: use deep copy instead of the '...' rest operation
    const { key, value, storage } = Util.merge({
      storage: this.storage,
    }, options);
    // in case of data is not a json
    try {
      const _val = Mirror.isObject(value) ? JSON.stringify(value) : value;
      storage.setItem(key, _val);
    } catch(err) {
      throw new Error(err);
    }
    return true;
  }

  /**
   * @description get the value of the storage of browser
   * @param {Object} options 
   * @returns {*} the value was storaged in Browser before
   */
  getStorage(options) {
    const { key, type, storage } = Util.merge({
      storage: this.storage,
    }, options);
    let _val = storage.getItem(key);
    // if type is not a json, return the original value
    if (type.toLocaleUpperCase() !== 'OBJECT') {
      return _val;
    }
    try {
      // parse the val
      _val = JSON.parse(_val);
    } catch (e) {}// eslint-disable-line
    return _val;
  }

  /**
   * 
   * @param {String} key the key of value 
   * @param {Object} storage either is a localStorage or sessionStorage
   * @returns {Boolean} the status whether the key exist or not
   */
  checkStorageExist(key, storage) {
    if (!key) {
      throw new Error('Must have a key to check object exist!');
    }
    if (Mirror.isObject(storage)) {
      this.storage = storage;
    }
    const obj = this.getStorage({
      key,
      type: 'String',
    });
    if (Mirror.isUndefined(obj)) {
      return false;
    }
    return true;
  }
  
  /**
   * @description remove the value has been storaged in browser
   * @param {Object} options  key not null; storage: default is localStorage
   * @returns {Boolean} the flag of whether the opertation successed or not
   */
  removeStorage(options) {
    const { key, storage } = Util.merge({
      storage: this.storage,
    }, options);
    storage.removeItem(key);
    return true;
  }

  /**
   * @description clear all of the value have been storaged in browser
   * @param {Object} options  storage: default is localStorage
   * @returns {Boolean} the flag of whether the opertation successed or not
   */
  clearStorage(options) {
    const { storage } = Util.merge({
      storage: this.storage,
    }, options);
    storage.clear();
    return true;
  }
}
