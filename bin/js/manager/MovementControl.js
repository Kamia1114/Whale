<<<<<<< HEAD
/**
 * 控制器
 */
var MovementControl = /** @class */ (function () {
    function MovementControl($map, $self) {
        this._map = $map;
        this._uSelf = $self;
        this._uSelf.x = 650;
        this._uSelf.y = 380;
        this._map.addChild(this._uSelf);
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
=======
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
>>>>>>> f3882855fd199c7c55e8efd37b81a2c7e2dd0a58
//# sourceMappingURL=MovementControl.js.map