import { MirrorCheck } from './MirrorCheck';

export class Util {
  /**
   * 
   * @param {Object} previous lower priority
   * @param {Object} nextObj higher priority
   */
  static merge(previous, nextObj) {
    if (!MirrorCheck.isObject(previous) || !MirrorCheck.isObject(nextObj)) {
      throw new Error('Parameters must be two Object!');
    }
    return {
      ...previous,
      ...nextObj,
    };
  }
}
