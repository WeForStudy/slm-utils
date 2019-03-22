const utls = require('../lib');
const assert = require('assert');

const { Validator } = utls;
describe('Util test', () => {
  describe('Validator check', () => {
    it('should be true when value include number (includeNumber)', () => {
      const objA = '123abc';
      assert.equal(Validator.getInstance().includeNumber(objA), true);
    });
    it('should be false when value not only include number (onlyNumber)', () => {
      const objA = '123abc';
      assert.equal(Validator.getInstance().onlyNumber(objA), false);
    });
    it('should be true when values format include http:// or https:// (formatUrl)', () => {
      const objA = 'https://';
      assert.equal(Validator.getInstance().formatUrl(objA), true);
    });
    it('should be true when values format normal Phone', () => {
      const objA = '13212312321';
      assert.equal(Validator.getInstance().formatCnPhone(objA), true);
    });
    it('should be false when values not only include EN Char', () => {
      const objA = 'asd12';
      assert.equal(Validator.getInstance().formatCnPhone(objA), false);
    });
    it('should be true when values include Blank', () => {
      const objA = 'asd 12';
      assert.equal(Validator.getInstance().includeBlank(objA), true);
    });
    it('should be true when values include Special char', () => {
      const objA = 'asd 12';
      assert.equal(Validator.getInstance().includeSpecialChar(objA), true);
    });
    it('should be true when values include Chinese char', () => {
      const objA = '你';
      assert.equal(Validator.getInstance().includeEnlishAndChineseChar(objA), true);
    });
    it('should be false when values include , char', () => {
      const objA = 'ab,d';
      assert.equal(Validator.getInstance().includeSpecCharAndExcludeSimpleChar(objA), true);
    });
  });
});