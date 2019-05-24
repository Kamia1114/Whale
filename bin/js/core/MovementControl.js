/**
 * 控制器
 */
var MovementControl = /** @class */ (function () {
    function MovementControl($map, $self) {
        //常速3秒移动距离
        this._Distance = 150;
        this._map = $map;
        this._uSelf = $self;
        this._map.addChild(this._uSelf);
        this._startP = this._uSelf.iPoint;
    }
    MovementControl.prototype.start = function () {
        this.addPlayEvent();
        // let myData = UnitDataMgr.instance.selfInfo;
        //更新地图动作,分开更新因为这个频率要高些
        gRaceTimerMgr.addTimerLoop(Laya.Handler.create(this, this._updateTime, null, false), Define.FrameTime, -1);
    };
    MovementControl.prototype._updateTime = function () {
        //游戏时间按帧更新
        // this.doMove();
        this._updateMapCoord();
    };
    /** 更新地图位置保持自己始终位于屏幕中心 */
    MovementControl.prototype._updateMapCoord = function () {
    };
    /** 运动主逻辑 */
    MovementControl.prototype.doMove = function () {
    };
    MovementControl.prototype.addPlayEvent = function () {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseHandler);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseHandler);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseHandler);
    };
    MovementControl.prototype.mouseHandler = function (e) {
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                GeTool.getTargetPoint(Math.floor(Math.random() * 36), 50);
                break;
            case Laya.Event.MOUSE_MOVE:
                break;
            case Laya.Event.MOUSE_UP:
                break;
            case Laya.Event.MOUSE_OUT:
                break;
        }
    };
    return MovementControl;
}());
//# sourceMappingURL=MovementControl.js.map