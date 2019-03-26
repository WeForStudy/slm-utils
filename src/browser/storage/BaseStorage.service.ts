import { Mirror } from '../../util/Mirror';

export class BaseStorage {
  private instance = null;

  protected constructor (storage: any) {
    this.instance = storage;
  }

  /**
   * @description get the value which storaged by key
   * @param {string} key required, the key of the value
   * @param {string} type optional, the type of the value
   * @returns {any} can return any type
   */
  public get(key: string, type?: string): any {
    let _val = this.instance.getItem(key);
    try {
      // if type is not a json, return the original value
      if (Mirror.isString(type) && type.toUpperCase() !== 'OBJECT') {
        return _val;
      }
    } catch(e) {
      throw new Error(`type must be String, but got ${Mirror.getType(type)}`);
    }

    try {
      // parse the val
      _val = JSON.parse(_val);
    } catch (e) {}// eslint-disable-line
    return _val;
  }

  /**
   * @description set the value into storage with key
   * @param {string} key required, the key of the value
   * @param {any} value required, the value
   * @returns {boolean}, which determine whether execute success or not
   */
  public set(key: string, value: any): boolean {
    try {
      const _val = Mirror.isObject(value) ? JSON.stringify(value) : value;
      this.instance.setItem(key, _val);
      return true;
    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * @description check the value which storaged by key
   * @param {string} key required, the key of the value
   * @returns {boolean}, which determine whether exist or not
   */
  public check(key: string): boolean {
    if (!key) {
      throw new Error('Must have a key to check object exist!');
    }
    const obj = this.get(key);
    if (Mirror.isUndefined(obj)) {
      return false;
    }
    return true;
  }

  /**
   * @description remove the value which storage by key
   * @param {string} key required, the key of the value
   * @returns {boolean}, which determine whether execute success or not
   */
  public remove(key: string): boolean {
    this.instance.removeItem(key);
    return true;
  }


  /**
   * @description remove all the value that storaged in storage
   * @returns {boolean}, which determine whether execute success or not
   */
  public clear() {
    this.instance.clear();
    return true;
  }
}
