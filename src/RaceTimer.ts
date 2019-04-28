class RaceTimer {
    private _iID: number;
    callback: Laya.Handler;
    iTriggerCD: number;
    iDelayTime: number = 0;
    iLastTriggerTime: number = 0;
    iStartTime: number = 0;

    iRepeatTimes: number = 0;

    _needRemove: boolean = false;

    constructor(id: number) {
        this._iID = id;
        this.iStartTime = gMain.iGameTime;
    }

    public updateTimer(): boolean {
        if (this._needRemove) {
            return false;
        }

        var iNowTime = gMain.iGameTime;
        if (iNowTime - this.iStartTime >= this.iDelayTime && iNowTime - this.iLastTriggerTime >= this.iTriggerCD) {
            let delta = 0;
            if(this.iLastTriggerTime != 0){
                delta = iNowTime - this.iLastTriggerTime - this.iTriggerCD;
            }

            this.iLastTriggerTime = iNowTime - delta;
            // try {
            var isOnce = this.callback.once;
            this.callback.run();
            if (isOnce) this.callback = null;
            // } catch (error) {
            //    console.log(11); 
            // }

            return true;
        }
        return false;
    }

    get iID() {
        return this._iID;
    }

    set iID(value: number) {
        this._iID = value;
    }


    get needRemove() {
        return this._needRemove;
    }

    set needRemove(value: boolean) {
        this._needRemove = value;
    }

    public destroy() {
        this.callback && this.callback.recover();
        this.callback = null;
    }
}