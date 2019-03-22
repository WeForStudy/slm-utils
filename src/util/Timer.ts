import { Mirror } from './Mirror';
import { Observer } from '../base';
import { TIMER_TYPE } from '../_contants';

export class Timer extends Observer {
  public ticked: boolean;
  private timer: number; // record the id of timer
  private type: string = TIMER_TYPE.once;
  private readonly TIMER_UNIT: number = 1000; // the default unit of timer is second
  private readonly DEFAULT_SECOND: number = 1; // the default second of timer is one
  protected duration: number;
  protected callback: Function;
  constructor(opts: any) {
    super();
    const { duration, type } = opts;
    if (Mirror.isUndefined(duration)) {
      throw new Error('Timer must initialized with a duration');
    }
    if (!Mirror.isUndefined(type)) {
      const keys = Object.keys(TIMER_TYPE);
      const findOne = keys.find(item => item === type.toLowerCase());
      if (!findOne) {
        throw new Error(`Timer's type must be one of the  ${keys.join('、')}`);
      } else {
        this.type = findOne;
      }
    }
    this.duration = opts.duration;
    if (Mirror.isFunction(opts.callback)) {
      this.callback = opts.callback;
    }
  }

  /**
   * @description the getter of isTicked
   * @returns return the ticked
   */
  public get isTicked(): boolean {
    return this.ticked;
  }


  /**
   * @description handle the tick function
   */
  private handleTick(): void {
    if (Mirror.isFunction(this.callback)) {
      this.callback();
    }
    this.tock();
  }

  /**
   * @description start tick
   */
  public tick(): void { 
    this.emit('tick');
    if (this.type === TIMER_TYPE.once) {
      this.timer = setTimeout(this.handleTick, this.duration * this.TIMER_UNIT);
    } else {
      this.timer = setInterval(this.handleTick, this.duration * this.TIMER_UNIT)
    }
    this.ticked = true;
  }

  /**
   * @description tick-tock, tick-tock, tick...
   */
  public tock(): void {
    this.emit('tock');
  }
  
  /**
   * @description remove the timer
   */
  public remove(): void {
    if (this.timer) {
      if (this.type === TIMER_TYPE.once) {
        clearTimeout(this.timer);
      } else {
        clearInterval(this.timer);
      }
      this.emit('remove');
    }
  }

}
 