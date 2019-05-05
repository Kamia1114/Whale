var RaceTimerMgr = /** @class */ (function () {
    function RaceTimerMgr() {
        this.allTimer = {};
        this._timerID = 0;
        this._freeList = [];
    }
    RaceTimerMgr.prototype.finalize = function () {
        this.clearAll();
    };
    RaceTimerMgr.prototype.addTimerLoop = function (callback, cd, times, delayTime) {
        if (delayTime === void 0) { delayTime = 0; }
        var timer = this._addTimer(callback, cd, times, delayTime);
        timer.iRepeatTimes = times;
        return timer;
    };
    /**获取战斗计时器 */
    RaceTimerMgr.prototype.getRaceTimer = function (id) {
        return this.allTimer[id];
    };
    RaceTimerMgr.prototype.update = function () {
        for (var key in this.allTimer) {
            var timer = this.allTimer[key];
            if (!timer) {
                continue;
            }
            if (!timer.callback || timer.callback.caller == undefined) {
                this._addToFree(timer);
                delete this.allTimer[key];
            }
            else {
                var bUpdate = timer.updateTimer();
                if (bUpdate && timer.iRepeatTimes && timer.iRepeatTimes > 0) {
                    if (--timer.iRepeatTimes == 0 || timer.needRemove) {
                        this._addToFree(timer);
                        delete this.allTimer[key];
                    }
                }
            }
        }
    };
    RaceTimerMgr.prototype.clearTimerByID = function (id) {
        this._addToFree(this.allTimer[id]);
        delete this.allTimer[id];
    };
    RaceTimerMgr.prototype.clearAll = function () {
        for (var key in this.allTimer) {
            var timer = this.allTimer[key];
            if (timer) {
                timer.destroy();
            }
        }
        for (var i = 0; i < this._freeList.length; i++) {
            this._freeList[i].destroy();
        }
        this._freeList = [];
        this.allTimer = {};
    };
    RaceTimerMgr.prototype.clearTimerByCaller = function (caller) {
        for (var key in this.allTimer) {
            var timer = this.allTimer[key];
            if (timer && timer.callback && timer.callback.caller == caller) {
                this._addToFree(timer);
                delete this.allTimer[key];
            }
        }
    };
    RaceTimerMgr.prototype._addTimer = function (callback, cd, times, delayTime) {
        var newTimer = new RaceTimer(++this._timerID);
        this.allTimer[newTimer.iID] = newTimer;
        newTimer.iTriggerCD = cd;
        newTimer.callback = callback;
        newTimer.iDelayTime = delayTime;
        return newTimer;
    };
    RaceTimerMgr.prototype._addToFree = function (timer) {
        if (!timer)
            return;
        timer.destroy();
    };
    return RaceTimerMgr;
}());
//# sourceMappingURL=RaceTimerMgr.js.map