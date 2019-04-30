/**
 * 控制器
 */
var MovementControl = /** @class */ (function () {
    function MovementControl($map, $self) {
        this._map = $map;
        this._self = $self;
        this._self.x = Laya.stage.width / 2;
        this._self.y = Laya.stage.height / 2;
        this._map.addChild(this._self);
    }
    MovementControl.prototype.start = function () {
        //更新单位动作,分开更新因为这个频率要高些
        gRaceTimerMgr.addTimerLoop(Laya.Handler.create(this, this._updateTime, null, false), Define.FrameTime, -1);
    };
    MovementControl.prototype._updateTime = function () {
        //游戏时间按帧更新
    };
    return MovementControl;
}());
//# sourceMappingURL=MovementControl.js.map