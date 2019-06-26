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
    
    //活的鲸鱼池
    private _wahlePool: HashMap<whaleUnit>;
    //鲸鱼池尸体
    private _spareWahlePool: HashMap<whaleUnit>;
    //常速3秒移动距离
    private readonly _Distance = 150;

    constructor($map:Map, $self:whaleUnit) { 
        this._map = $map;
        this._uSelf = $self;
        this._wahlePool = new HashMap();
        this._spareWahlePool = new HashMap();
        this._wahlePool.set(this._uSelf.KID, this._uSelf);
        this._map.addChild(this._uSelf);
        this._startP = this._uSelf.iPoint;
    }
    
    public start() {
        // let myData = UnitDataMgr.instance.selfInfo;
        //更新地图动作,分开更新因为这个频率要高些
        gRaceTimerMgr.addTimerLoop(Laya.Handler.create(this, this._updateTime, null, false), Define.FrameTime, -1);
        gRaceTimerMgr.addTimerLoop(Laya.Handler.create(this, this._updateMove, null, false), 1000*Define.twConstVal, -1);
    }

    private _updateTime()
    {
        //游戏时间按帧更新
        this._updateMapCoord();
    }

    /** 更新地图位置保持自己始终位于屏幕中心 */
    private _updateMapCoord()
    {
        this._uSelf.refreshPoint();
        this._map.x = -this._uSelf.x;
        this._map.y = -this._uSelf.y;
        UnitInfoMgr.instance.selfPoint = new Laya.Point(this._uSelf.x, this._uSelf.y);
    }

    //增加新的<・)))><<
    private _addWhaleUnit(info:WhaleUnitInfo) {
        let newWhale = new whaleUnit(info);
        if(this._spareWahlePool.keys.length > 0) {
            
        }
        this._wahlePool.set(newWhale.KID, newWhale);
        this._map.addChild(newWhale);
    }

    //移动（现实层先动，同事发给服务器）
    public readyMove(x:number , y:number)
    {
        let cPoint:Laya.Point = new Laya.Point(GameConfig.width/2,GameConfig.height/2);
        let radian:number = Math.atan2((cPoint.y-y), (cPoint.x-x)) //弧度
        var angle:number = Math.round(radian*180/Math.PI/10)%36; //角度
        console.log("angle: " , angle);
        if (UnitInfoMgr.instance.selfInfo.angle == angle) return;
        UnitInfoMgr.instance.selfInfo.angle = angle;
        this.doMove(PlayerInfoMgr.instance.kID, {x:x, y:y, angle:angle});
        gNet.sendMovementAction(angle);
    }
    
    //显示上的移动信息
    public doMove(kId: number, info?:{x:number, y:number, angle:number}): void
    {
        let unitInfo = UnitInfoMgr.instance.getUnitDetailInfoByID(kId);
        let $info = info?info:{x:unitInfo.x, y:unitInfo.y, angle:unitInfo.angle};
        let targetP = GeTool.getTargetPoint(new Laya.Point(info.x,info.y), info.angle);
        console.log(`targetP: x: ${targetP.x}, y: ${targetP.y}` );

        let unit = this._wahlePool.get(kId);
        unit.gotoPoint(targetP);
        // this._updateMove(kId, targetP);
    }

    
    //更新所有单位运动
    private _updateMove()
    {
        //
    }
}