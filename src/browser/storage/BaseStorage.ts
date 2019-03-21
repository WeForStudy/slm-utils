import { Mirror, Util } from '../../util';

export class BaseStorage {
  private instance = null;
  constructor (storage: any) {
    this.instance = storage;
  }

  public get(key: string, type?: string): any {
    let _val = this.instance.getItem(key);
    // if type is not a json, return the original value
    if (type && type.toLocaleUpperCase() !== 'OBJECT') {
      return _val;
    }
    try {
      // parse the val
      _val = JSON.parse(_val);
    } catch (e) {}// eslint-disable-line
    return _val;
  }
  public set(key: string, value: any): boolean {
    try {
      const _val = Mirror.isObject(value) ? JSON.stringify(value) : value;
      this.instance.setItem(key, _val);
      return true;
    } catch(err) {
      throw new Error(err);
    }
  }

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

  public remove(key: string): boolean {
    this.instance.remove(key);
    return true;
  }

  public clearStorage() {
    this.instance.clear();
    return true;
  }
}