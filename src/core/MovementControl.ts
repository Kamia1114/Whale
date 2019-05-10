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

    //常速3秒移动距离
    private readonly _Distance = 150;

    constructor($map:Map, $self:whaleUnit) { 
        this._map = $map;
        this._uSelf = $self;
        this._map.x = this._mapOffsetX = Define.stageWidth/2;
        this._map.y = this._mapOffsetY = Define.stageHeight/2;
        this._map.addChild(this._uSelf);

        this._startP = this._uSelf.iPoint;
    }
    
    public start() {
        let myData = UnitDataMgr.instance.getSelfInfo();
        
        Laya.Tween.to(this._uSelf,{} )
        //更新地图动作,分开更新因为这个频率要高些
        gRaceTimerMgr.addTimerLoop(Laya.Handler.create(this, this._updateTime, null, false), Define.FrameTime, -1);
    }

    private _updateTime()
    {
        //游戏时间按帧更新
        this._uSelf.x = this._uSelf.iPoint.x;
        this._uSelf.y = this._uSelf.iPoint.y;
        this.doMove();
    }

    /** 运动主逻辑 */
    private doMove() {

    }
}