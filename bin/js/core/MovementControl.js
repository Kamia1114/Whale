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
        // let myData = UnitDataMgr.instance.selfInfo;
        //更新地图动作,分开更新因为这个频率要高些
        gRaceTimerMgr.addTimerLoop(Laya.Handler.create(this, this._updateTime, null, false), Define.FrameTime, -1);
    };
    MovementControl.prototype._updateTime = function () {
        //游戏时间按帧更新
        this._updateMapCoord();
        //更新运动
    };
    /** 更新地图位置保持自己始终位于屏幕中心 */
    MovementControl.prototype._updateMapCoord = function () {
        this._map.x = -this._uSelf.x;
        this._map.y = -this._uSelf.y;
        UnitInfoMgr.instance.selfPoint = new Laya.Point(this._uSelf.x, this._uSelf.y);
    };
    MovementControl.prototype.move = function (x, y) {
        var cPoint = new Laya.Point(GameConfig.width / 2, GameConfig.height / 2);
        var radian = Math.atan2((cPoint.y - y), (cPoint.x - x)); //弧度
        var angle = Math.round(radian * 180 / Math.PI / 10) % 36; //角度
        console.log("angle: ", angle);
        if (UnitInfoMgr.instance.selfInfo.angle == angle)
            return;
        UnitInfoMgr.instance.selfInfo.angle = angle;
        this._doMove(x, y, angle, PlayerInfoMgr.instance.kID);
        gNet.sendMovementAction(angle);
    };
    //显示上的移动信息
    MovementControl.prototype._doMove = function (x, y, angle, kId) {
        var targetP = GeTool.getTargetPoint(new Laya.Point(x, y), angle);
        console.log("targetP: x: " + targetP.x + ", y: " + targetP.y);
        this._uSelf;
    };
    return MovementControl;
}());
//# sourceMappingURL=MovementControl.js.map