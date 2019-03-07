export class MirrorCheck {
  /**
   * @description Return the tyoe of parameter
   * @param {*} obj A parameter maybe any type
   */
  static getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }
  /**
   * @description Return ture if the type of obj is Array, otherwise return false
   * @param {*} obj A parameter maybe any type
   */
  static isArray(obj) {
    return this.getType(obj) === 'Array';
  }
  /**
   * @description Return ture if the type of obj is Object, otherwise return false
   * @param {*} obj A parameter maybe any type
   */
  static isObject(obj) {
    return this.getType(obj) === 'Object';
  }
  /**
   * @description Return ture if the type of obj is String, otherwise return false
   * @param {*} obj A parameter maybe any type
   */
  static isString(obj) {
    return this.getType(obj) === 'String';
  }
  /**
   * @description Return ture if the type of obj is Null, otherwise return false
   * @param {*} obj A parameter maybe any type
   */
  static isNull(obj) {
    return this.getType(obj) === 'Null';
  }
  /**
   * @description Return ture if the type of obj is Undefined, otherwise return false
   * @param {*} obj A parameter maybe any type
   */
  static isUndefined(obj) {
    return this.getType(obj) === 'Undefined';
  }
  /**
   * @description Return ture if the type of obj is Number, otherwise return false
   * @param {*} obj A parameter maybe any type
   */
  static isNumber(obj) {
    return this.getType(obj) === 'Number';
  }
  /**
   * @description Return ture if the type of obj is Array, otherwise return false
   * @param {*} obj A parameter maybe any type
   */
  static isBoolean(obj) {
    return this.getType(obj) === 'Boolean';
  }
  /**
   * @description Return ture if the type of obj is Array, otherwise return false
   * @param {*} obj A parameter maybe any time
   */
  static isDate(obj) {
    return this.getType(obj) === 'Date';
  }
  /**
   * @description Return ture if the type of obj is Array, otherwise return false
   * @param {*} obj A parameter maybe any type
   */
  static isFile(obj) {
    return this.getType(obj) === 'File';
  }
  /**
   * @description Return ture if typeof obj is Array, otherwise return false
   * @param {*} obj A parameter maybe any type
   */
  static isFunction(obj) {
    return this.getType(obj) === 'Function';
  }
}
