class RaceTimerMgr {
    allTimer: Object = {};
    private _freeList:Array<RaceTimer>;
    private _timerID: number = 0;
    constructor() {
        this._freeList=[];
    }

    public finalize(): void {
        this.clearAll();
    }

    public addTimerLoop(callback: Laya.Handler, cd: number, times: number, delayTime: number = 0): RaceTimer {
        var timer = this._addTimer(callback, cd, times, delayTime);
        timer.iRepeatTimes = times;
        return timer;
    }

    /**获取战斗计时器 */
    public getRaceTimer(id:number):RaceTimer{
        return this.allTimer[id];
    }

    public update():void {
        for (var key in this.allTimer) {
            var timer: RaceTimer = this.allTimer[key];
            if (!timer) {
                continue;
            }
            if (!timer.callback || timer.callback.caller == undefined) {
                //this.arrayTimer[idx] = null;
                //this.arrayTimer.splice(idx, 1);
                this._addToFree(timer);
                delete this.allTimer[key];
            }
            else {
                var bUpdate = timer.updateTimer();
                if (bUpdate && timer.iRepeatTimes && timer.iRepeatTimes > 0) {
                    if (--timer.iRepeatTimes == 0 || timer.needRemove) {
                        // this.arrayTimer[idx] = null;
                        // this.arrayTimer.splice(idx, 1);
                        this._addToFree(timer);
                        delete this.allTimer[key];
                    }
                }
            }
        }
    }

    public clearTimerByID(id: number) {
        this._addToFree(this.allTimer[id]);
        delete this.allTimer[id];
    }

    public clearAll(){
        for (var key in this.allTimer) {
            var timer: RaceTimer = this.allTimer[key];
            if (timer) {
                timer.destroy();
            }
        }
        for(var i=0;i<this._freeList.length;i++){
            this._freeList[i].destroy();
        }
        this._freeList=[];
        this.allTimer = {};
    }

    public clearTimerByCaller(caller: any): void {
        for (var key in this.allTimer) {
            var timer: RaceTimer = this.allTimer[key];
            if (timer && timer.callback &&  timer.callback.caller == caller) {
                this._addToFree(timer);
                delete this.allTimer[key];
            }
        }
    }

    private _addTimer(callback: Laya.Handler, cd: number, times: number, delayTime: number): RaceTimer {
        var newTimer = new RaceTimer(++this._timerID);
        this.allTimer[newTimer.iID] = newTimer;
        newTimer.iTriggerCD = cd;
        newTimer.callback = callback;
        newTimer.iDelayTime = delayTime;

        return newTimer;
    }

    private _addToFree(timer:RaceTimer){
        if(!timer)return;
        timer.destroy();
        // this._freeList.push(timer);
    }
}