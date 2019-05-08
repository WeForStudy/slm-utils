
export class ValidatorUtil {

  private static instance = null;

  /**
   * @description private the constructor in case other new it
   */
  private constructor() {
  }

  /**
   * @description get the instance of Validator
   */
  public static getInstance(): ValidatorUtil {
    if (!this.instance) {
      this.instance = new ValidatorUtil();
    }
    return this.instance;
  }

  /**
   * @description inside method will be use in every method
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private regTest(reg: RegExp, str: any): boolean {
    return reg.test(str);
  }

  /**
   * @description check string whether is a url or not
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private formatUrl(str: string): boolean {
    const reg = /^(https|http):\/\//g;
    return this.regTest(reg, str);
  }

  
  /**
   * @description check string whether is a email url or not
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private formatEmail(str: string): boolean {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
    return this.regTest(reg, str);
  }

  /**
   * @description check string whether is a url or not
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private formatCnPhone(str: string): boolean {
    const reg = /^1(3|4|5|6|7|8|9)\d{9}$/g;
    return this.regTest(reg, str);
  }

  /**
   * @description check string whether is only a en char or not
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private onlyIncludeEn(str: string): boolean {
    const reg = /[^a-zA-Z]/g;
    return this.regTest(reg, str);
  }

  /**
   * @description check string whether is Number or not
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private includeNumber(str: any): boolean {
    return this.regTest(/[0-9]/g, str);
  }

  /**
   * @description check string whether is only include number or not
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private onlyIncludeNumber(str: any): boolean {
    return !this.regTest(/[^0-9]$/g, str);
  }

  /**
   * @description check string whether include blank or not
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private includeBlank(str: any): boolean {
    return this.regTest(/\s+|\s+$/g, str);
  }

  /**
   * @description check string whether is special char or not
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private includeSpecialChar(str: string): boolean {
    const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    if (this.includeBlank(str)) return true;
    if (this.regTest(regEn, str)) return true;
    return this.regTest(regCn, str);
  }

  /**
   * @description check string whether include blank or not
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private includeEnlishAndChineseChar(str: any): boolean {
    return this.regTest(/^[\u4e00-\u9fa5a-z]+$/gi, str);
  }

  /**
   * @description check string whether include special char or not
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private includeSpecCharAndExcludeSimpleChar(str: string): boolean {
    const regEn = /[`~!@#$%^&*()_+<>?:"{}.\/;'[\]]/im,
    regCn = /[·！#￥（——）|《》【】[\]]/im; // exclude , 、“”‘’ 。 ？；：
    if (this.regTest(regEn, str)) return true;
    return this.regTest(regCn, str);
  }

  /**
   * @description check string whether start with number or not
   * @param {String} str the string will be checked later
   * @returns {Boolean} the result
   */
  private isStartWithNumber(str: string): boolean {
    return this.regTest(/^\d/gi, str);
  }

}
