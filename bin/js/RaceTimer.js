var RaceTimer = /** @class */ (function () {
    function RaceTimer(id) {
        this.iDelayTime = 0;
        this.iLastTriggerTime = 0;
        this.iStartTime = 0;
        this.iRepeatTimes = 0;
        this._needRemove = false;
        this._iID = id;
        this.iStartTime = client.iGameTime;
    }
    RaceTimer.prototype.updateTimer = function () {
        if (this._needRemove) {
            return false;
        }
        var iNowTime = client.iGameTime;
        if (iNowTime - this.iStartTime >= this.iDelayTime && iNowTime - this.iLastTriggerTime >= this.iTriggerCD) {
            var delta = 0;
            if (this.iLastTriggerTime != 0) {
                delta = iNowTime - this.iLastTriggerTime - this.iTriggerCD;
            }
            this.iLastTriggerTime = iNowTime - delta;
            // try {
            var isOnce = this.callback.once;
            this.callback.run();
            if (isOnce)
                this.callback = null;
            // } catch (error) {
            //    console.log(11); 
            // }
            return true;
        }
        return false;
    };
    Object.defineProperty(RaceTimer.prototype, "iID", {
        get: function () {
            return this._iID;
        },
        set: function (value) {
            this._iID = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RaceTimer.prototype, "needRemove", {
        get: function () {
            return this._needRemove;
        },
        set: function (value) {
            this._needRemove = value;
        },
        enumerable: true,
        configurable: true
    });
    RaceTimer.prototype.destroy = function () {
        this.callback && this.callback.recover();
        this.callback = null;
    };
    return RaceTimer;
}());
//# sourceMappingURL=RaceTimer.js.map