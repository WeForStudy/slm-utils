const slmUtils = require('../lib');
const assert = require('assert');

const { Mirror } = slmUtils;

describe('Util test', () => {
  describe('Mirror check', () => {
    it('should be true when value is object (isObject)', () => {
      const objA = {
        name: 'XXX',
      };
      assert.equal(Mirror.isObject(objA), true);
    });
    it('Should be false when value is string (isObject)', () => {
      const val = 'a';
      assert.equal(Mirror.isObject(val), false);
    });
    it('Should be true when value is undefined (isUndefined)', () => {
      const val = undefined;
      assert.equal(Mirror.isUndefined(val), true);
    });
    it('Should be false when value is string (isUndefined)', () => {
      const val = 'a';
      assert.equal(Mirror.isUndefined(val), false);
    });
    it('Should be true when value is null (isNull)', () => {
      const val = null;
      assert.equal(Mirror.isNull(val), true);
    });
    it('Should be false when value is string (isNull)', () => {
      const val = 'a';
      assert.equal(Mirror.isNull(val), false);
    });
    it('Should be true when value is string (isString)', () => {
      const val = 'null';
      assert.equal(Mirror.isString(val), true);
    });
    it('Should be false when value is not string (isString)', () => {
      const val = null;
      assert.equal(Mirror.isString(val), false);
    });
    it('Should be true when value is date (isDate)', () => {
      const val = new Date();
      assert.equal(Mirror.isDate(val), true);
    });
    it('Should be false when value is not a date (isDate)', () => {
      const val = 'a';
      assert.equal(Mirror.isDate(val), false);
    });
    it('Should be true when value is array (isArray)', () => {
      const val = [];
      assert.equal(Mirror.isArray(val), true);
    });
    it('Should be false when value is not an array (isArray)', () => {
      const val = 'a';
      assert.equal(Mirror.isArray(val), false);
    });
    it('Should be true when value is a boolean (isBoolean)', () => {
      const val = true;
      assert.equal(Mirror.isBoolean(val), true);
    });
    it('Should be false when value is not a boolean (isBoolean)', () => {
      const val = 'a';
      assert.equal(Mirror.isBoolean(val), false);
    });
    it('Should be true when value is number (isNumber)', () => {
      const val = 1;
      assert.equal(Mirror.isNumber(val), true);
    });
    it('Should be false when value is not a number (isNumber)', () => {
      const val = 'a';
      assert.equal(Mirror.isNumber(val), false);
    });
    // #need to solve
    // it('Should be true when value is file (isFile)', () => {
    //   const val = new File();
    //   assert.equal(Mirror.isFile(val), true);
    // });
    // it('Should be false when value is not a file (isFile)', () => {
    //   const val = 'a';
    //   assert.equal(Mirror.isFile(val), false);
    // });
  });
});