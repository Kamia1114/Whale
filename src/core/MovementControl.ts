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
        this._map.addChild(this._uSelf);
        this._startP = this._uSelf.iPoint;
    }
    
    public start() {
        this.addPlayEvent();
        // let myData = UnitDataMgr.instance.selfInfo;
        //更新地图动作,分开更新因为这个频率要高些
        gRaceTimerMgr.addTimerLoop(Laya.Handler.create(this, this._updateTime, null, false), Define.FrameTime, -1);
    }

    private _updateTime()
    {
        //游戏时间按帧更新
        // this.doMove();
        this._updateMapCoord();
    }

    /** 更新地图位置保持自己始终位于屏幕中心 */
    private _updateMapCoord()
    {
        
    }

    /** 运动主逻辑 */
    private doMove() {
        
    }

    
    private addPlayEvent() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseHandler);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseHandler);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseHandler);
    }

    private mouseHandler(e:Laya.Event)
    {
        switch(e.type) {
            case Laya.Event.MOUSE_DOWN:
                GeTool.getTargetPoint(Math.floor(Math.random()*36), 50);
                break;
            case Laya.Event.MOUSE_MOVE:
                
                break;
            case Laya.Event.MOUSE_UP:
                
                break;
            case Laya.Event.MOUSE_OUT:
                
                break;
        }
    }
}