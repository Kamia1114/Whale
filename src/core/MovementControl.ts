/**
 * 控制器
 */
class MovementControl{
    private _map: Map;
    private _uSelf: whaleUnit;
    //起始位置
    private _mapPoint: Laya.Point;
    //
    private _myStartPoint: Laya.Point;

    constructor($map:Map, $self:whaleUnit) { 
        this._map = $map;
        this._uSelf = $self;
        this._uSelf.x = Define.stageWidth/2;
        this._uSelf.y = Define.stageHeight/2;
        this._map.addChild(this._uSelf);

        this._mapPoint = new Laya.Point(Define.stageWidth/2, Define.stageHeight/2);
        
    }
    
    public start() {
        //更新单位动作,分开更新因为这个频率要高些
        gRaceTimerMgr.addTimerLoop(Laya.Handler.create(this, this._updateTime, null, false), Define.FrameTime, -1);
    }

    private _updateTime()
    {
        //游戏时间按帧更新
        this._uSelf.x = this._uSelf.uPoint.x;
        this._uSelf.y = this._uSelf.uPoint.y;
    }

    // private _getCurPoint() :Laya.Point
    // {
    //     if(this._uSelf.isChange) {
    //         return 
    //     }
    // }
}