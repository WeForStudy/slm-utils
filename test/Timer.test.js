const utls = require('../lib');
const assert = require('assert');

const { Mirror } = utls;

describe('Util test', () => {
  describe('Mirror check', () => {
    it('should be true when value is object (isObject)', () => {
      const objA = {
        name: 'XXX',
      };
      assert.equal(Mirror.isObject(objA), true);
    });
  });
});