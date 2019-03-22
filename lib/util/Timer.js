"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const _contants_1 = require("../_contants");
const base_1 = require("../base");
class Timer extends base_1.Observer {
    constructor(opts) {
        super();
        this.type = _contants_1.TIMER_TYPE.once;
        this.TIMER_UNIT = 1000; // the default unit of timer is second
        this.DEFAULT_SECOND = 1; // the default second of timer is one
        const { duration, type } = opts;
        if (index_1.Mirror.isUndefined(duration)) {
            throw new Error('Timer must initialized with a duration and a callback function!');
        }
        if (!index_1.Mirror.isUndefined(type)) {
            const keys = Object.keys(_contants_1.TIMER_TYPE);
            const findOne = keys.find(item => item === type.toLowerCase());
            if (!findOne) {
                throw new Error(`Timer's type must be one of the  ${keys.join('、')}`);
            }
            else {
                this.type = findOne;
            }
        }
        this.duration = opts.duration;
        if (index_1.Mirror.isFunction(opts.callback)) {
            this.callback = opts.callback;
        }
    }
    /**
     * @description the getter of isTicked
     * @returns return the ticked
     */
    get isTicked() {
        return this.ticked;
    }
    /**
     * @description handle the tick function
     */
    handleTick() {
        if (index_1.Mirror.isFunction(this.callback)) {
            this.callback();
        }
        this.tock();
    }
    /**
     * @description start tick
     */
    tick() {
        this.emit('tick');
        if (this.type === _contants_1.TIMER_TYPE.once) {
            this.timer = setTimeout(this.handleTick, this.duration * this.TIMER_UNIT);
        }
        else {
            this.timer = setInterval(this.handleTick, this.duration * this.TIMER_UNIT);
        }
        this.ticked = true;
    }
    /**
     * @description tick-tock, tick-tock, tick...
     */
    tock() {
        this.emit('tock');
    }
    /**
     * @description remove the timer
     */
    remove() {
        if (this.timer) {
            if (this.type === _contants_1.TIMER_TYPE.once) {
                clearTimeout(this.timer);
            }
            else {
                clearInterval(this.timer);
            }
            this.emit('remove');
        }
    }
}
exports.Timer = Timer;
