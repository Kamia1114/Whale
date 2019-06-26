class UnitInfoMgr{
    private static _instance: UnitInfoMgr;
    /** 自己 */
    private _selfUnit: WhaleUnitInfo;
    /** 简短信息 */
    private _mapUnitInfo: HashMap<WhaleShortInfo>;
    /** 周围用户详情信息 */
    private _sideUnitInfo: HashMap<WhaleUnitInfo>;

    static get instance(): UnitInfoMgr {
        !this._instance && (this._instance = new UnitInfoMgr());
        return this._instance;
    }
    
    constructor() {
    }

    public updateMyInfo(info: WhaleUnitInfo) {
        console.log("updateMyInfo", info);
        for (var key in info){
            if(!this._selfUnit[key] || this._selfUnit[key] != info[key]) {
                //数据变动了
                this._selfUnit[key] = info[key];
            }
        }
    }

    public get selfInfo(): WhaleUnitInfo
    {
        return this._selfUnit;
    }

    public set selfPoint(p:Laya.Point) {
        this._selfUnit.x = p.x;
        this._selfUnit.y = p.y;
    }

    public updateMapUnitInfo(data: Array<WhaleShortInfo>) {
        console.log("updateMapUnitInfo", data);
        //下边计算多少范围内的数据需要请求详情信息
        
    }

    public updateMapDetailUnitInfo($info: Array<any>) {
        console.log("updateMapDetailUnitInfo");
        if(!this._sideUnitInfo) {
            this._sideUnitInfo = new HashMap();
        }
        let kIDs:Array<number> = [];
        for(let i = 0; i < $info.length; i++) {
            let unitInfo:WhaleUnitInfo = this._sideUnitInfo.get($info[i].kId);
            if(!unitInfo) unitInfo =  {skin:"", followId:0, attendant:[], isSelf:false, kID:0, x:0, y:0, angle:0, speed:false, mapId:1};
            for (let key in $info[i]) {
                unitInfo[key] = $info[i][key];
            }
            this._sideUnitInfo.set($info[i].kId, unitInfo);
            kIDs.push(unitInfo.kID);
            //加入到对应map里
        }
        kIDs.length>0 && gUIMgr.LayaStageEvent(G_EVENT.UNIT_MOVE_INFO, kIDs); //触发移动更新
    }
}
