/**
 * 控制器
 */
class MovementControl{

    private _map: Map;
    private _self: whaleUnit;

    constructor($map:Map, $self:whaleUnit) { 
        this._map = $map;
        this._self = $self;
        this._map.addChild(this._self);

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