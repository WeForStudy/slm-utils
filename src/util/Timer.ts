import { Mirror } from './index';
import { Observer } from '../base';
export class Timer extends Observer {
  public ticked: boolean;
  protected duration: number;
  protected callback: Function;
  private timer: number; // record the id of timer
  private readonly TIMER_UNIT: number = 1000; // the default unit of timer is second
  private readonly DEFAULT_SECOND: number = 1; // the default second of timer is one
  constructor(opts: any) {
    super();
    this.duration = opts.duration;
    if (Mirror.isFunction(opts.callback)) {
      this.callback = opts.callback;
    }
  }

  private handleTick() {
    if (Mirror.isFunction(this.callback)) {
      this.callback();
    }
    this.tock();
    this.ticked = true;
  }

  public tick(): void { 
    this.emit('tick');
    this.timer = setTimeout(this.handleTick, this.duration * this.TIMER_UNIT || this.DEFAULT_SECOND * this.TIMER_UNIT);
  }

  public tock(): void {
    this.emit('tock');
  }
  
  public remove(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

}
 