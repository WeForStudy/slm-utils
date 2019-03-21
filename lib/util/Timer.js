"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const base_1 = require("../base");
class Timer extends base_1.Observer {
    constructor(opts) {
        super();
        this.TIMER_UNIT = 1000; // the default unit of timer is second
        this.DEFAULT_SECOND = 1; // the default second of timer is one
        this.duration = opts.duration;
        if (index_1.Mirror.isFunction(opts.callback)) {
            this.callback = opts.callback;
        }
    }
    handleTick() {
        if (index_1.Mirror.isFunction(this.callback)) {
            this.callback();
        }
        this.tock();
        this.ticked = true;
    }
    tick() {
        this.emit('tick');
        this.timer = setTimeout(this.handleTick, this.duration * this.TIMER_UNIT || this.DEFAULT_SECOND * this.TIMER_UNIT);
    }
    tock() {
        this.emit('tock');
    }
    remove() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
}
exports.Timer = Timer;
