export class Observer {
  private handlers: any[];
  constructor() {
    // initial the handlers as a empty array
    this.handlers = [];
  }

  /**
   * @description find the handle exist in handlers, return it;
   * @param {String} name the handlers name
   */
  private _find(name: string): any {
    let obj = {};
    const flag = this.handlers.some((handler, index) => {
      if (handler.name === name) {
        obj = {
          item: handler,
          index,
        }
        return true;
      }
      return false;
    });
    if (!flag) return false;
    return obj;
  }

  /**
   * @description add the hanlder to the handlers
   * @param name 
   * @param {Function} handler the handler will be call
   * @param {Function} _once 
   */
  protected on(name, handler, _once: Boolean = false): void {
    const obj: any = this._find(name);
    if (!obj) {
      this.handlers.push({
        name,
        handler,
        _once,
      });
    } else {
      // if find old, replace it with new one
      this.handlers.splice(obj.index, 1, {
        ...obj.item,
        handler,
        _once,
      });
    }
  }

  /**
   * @description add only can call once handler into handlers
   * @param {String} name the name of hanlder 
   * @param {Function} handler the callback 
   */
  protected once(name, handler): void {
    this.on(name, handler, true);
  }

  /**
   * @description emit the handler to observer
   * @param {String} name the name of handler
   * @param {Any} params it can be any type
   */
  protected emit(name: string, params?: any): void {
    const obj: any = this._find(name);
    if (obj) {
      const { item: _item } = obj;
      if (_item.handler) {
        // if only once, remove it after it emit
        if (_item._once) {
          this.handlers = this.handlers.filter(handler => handler.name !== _item.name);
        }
        // emit the handler
        _item.handler(params);
      } else {
        // throw the error
        throw new Error('Opps, occured an error, handler is undefined!');
      }
    }
  }

  /**
   * @description clear all the handlers
   */
  protected clear() {
    this.handlers = [];
  }

}
