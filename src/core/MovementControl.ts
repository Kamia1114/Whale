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
        this._map.x = -this._uSelf.x;
        this._map.y = -this._uSelf.y;
    }
    
    private addPlayEvent() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseHandler);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseHandler);
    }

    private mouseHandler(e:Laya.Event)
    {
        switch(e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.doMove(e.stageX, e.stageY);
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseHandler);
                break;
            case Laya.Event.MOUSE_MOVE:
                
                break;
            case Laya.Event.MOUSE_UP:
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseHandler);
                break;
            case Laya.Event.MOUSE_OUT:
                
                break;
        }
    }
    
    /** 运动主逻辑 */
    private doMove(x,y) {
        var p1:Laya.Point = new Laya.Point(x,y);
        var p2:Laya.Point = new Laya.Point(GameConfig.width/2,GameConfig.height/2);
        
        var angle:number = Math.atan2((p2.y-p1.y), (p2.x-p1.x)) //弧度\
        console.log("angle" , angle);
        var theta:number = Math.round(angle*(180/Math.PI)/10)%36; //角度
        console.log("theta" , angle*(180/Math.PI), "  -", theta);

        gNet.sendMovementAction(new Laya.Point(x,y), theta);
    }
}