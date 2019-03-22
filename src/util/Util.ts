import { Mirror } from './Mirror';

export class Util {
  /**
   * 
   * @param {Object} previous lower priority
   * @param {Object} nextObj higher priority
   */
  static merge(previous, nextObj) {
    if (!Mirror.isObject(previous) || !Mirror.isObject(nextObj)) {
      throw new Error('Parameters must be two Object!');
    }
    return {
      ...previous,
      ...nextObj,
    };
  }
}
