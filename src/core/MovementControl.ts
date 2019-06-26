/**
 * 控制器
 */
class MovementControl{
    private _map: Map;
    private _uSelf: whaleUnit;
    /** 小鱼鱼的起始坐标 */
    private _startP: Laya.Point;
    /** 地图位置补值 */
    private _mapOffsetX: number;
    private _mapOffsetY: number;

    private _curAngle: number;
    //常速3秒移动距离
    private readonly _Distance = 150;

    constructor($map:Map, $self:whaleUnit) { 
        this._map = $map;
        this._uSelf = $self;
        this._map.addChild(this._uSelf);
        this._startP = this._uSelf.iPoint;
    }
    
    public start() {
        // let myData = UnitDataMgr.instance.selfInfo;
        //更新地图动作,分开更新因为这个频率要高些
        gRaceTimerMgr.addTimerLoop(Laya.Handler.create(this, this._updateTime, null, false), Define.FrameTime, -1);
    }

    private _updateTime()
    {
        //游戏时间按帧更新
        this._updateMapCoord();
        //更新运动
    }

    /** 更新地图位置保持自己始终位于屏幕中心 */
    private _updateMapCoord()
    {
        this._map.x = -this._uSelf.x;
        this._map.y = -this._uSelf.y;
        UnitInfoMgr.instance.selfPoint = new Laya.Point(this._uSelf.x, this._uSelf.y);
    }

    public move(x:number , y:number)
    {
        let cPoint:Laya.Point = new Laya.Point(GameConfig.width/2,GameConfig.height/2);
        let radian:number = Math.atan2((cPoint.y-y), (cPoint.x-x)) //弧度
        var angle:number = Math.round(radian*180/Math.PI/10)%36; //角度
        console.log("angle: " , angle);
        if (UnitInfoMgr.instance.selfInfo.angle == angle) return;
        UnitInfoMgr.instance.selfInfo.angle = angle;
        this._doMove(x, y, angle, PlayerInfoMgr.instance.kID);
        gNet.sendMovementAction(angle);
    }
    
    //显示上的移动信息
    private _doMove(x:number, y:number, angle:number, kId: number): void
    {
        let targetP = GeTool.getTargetPoint(new Laya.Point(x,y), angle);
        console.log(`targetP: x: ${targetP.x}, y: ${targetP.y}` );
        this._uSelf
    }


}