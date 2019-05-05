/**
 * 控制器
 */
class MovementControl{

    private _map: Map;
    private _uSelf: whaleUnit;

    //起始位置
    private _mapPoint: Laya.Point;

    constructor($map:Map, $self:whaleUnit) { 
        this._map = $map;
        this._uSelf = $self;
        this._uSelf.x = 650;
        this._uSelf.y = 380;
        this._map.addChild(this._uSelf);
    }
    
    public start() {
        //更新单位动作,分开更新因为这个频率要高些
        gRaceTimerMgr.addTimerLoop(Laya.Handler.create(this, this._updateTime, null, false), Define.FrameTime, -1);
    }

    private _updateTime()
    {
        //游戏时间按帧更新
        
    }
}