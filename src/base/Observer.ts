export class Observer {
  private handlers: any[];
  constructor() {
    // initial the handlers as a empty array
    this.handlers = [];
  }

  // if you find one already exist in handlers, then return the index and the item
  _find(name) {
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

  // add listener here
  on(name, handler, _once = false) {
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

  // here add an listener only could be emit once
  once(name, handler) {
    this.on(name, handler, true);
  }

  // emit hanlder here
  emit(name, params = {}) {
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

  // clear all the handlers
  removeAll() {
    this.handlers = [];
  }

}
