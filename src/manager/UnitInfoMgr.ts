class UnitInfoMgr{
    private static _instance: UnitInfoMgr;
    /** 自己 */
    private _selfUnit: WhaleUnitInfo = {skin:"", followId:0, attendant:[], kID:0, x:0, y:0, angle:0, speed:0, mapId:1, charName:""};
    /** 简短信息 */
    private _mapUnitInfo: HashMap<BaseUnitInfo> = new HashMap();
    /** 周围用户详情信息 */
    private _sideUnitInfo: HashMap<WhaleUnitInfo> = new HashMap();

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


    public get selfInfo(): WhaleUnitInfo {
        return this._selfUnit;
    }

    public set selfPoint(p:Laya.Point) {
        this._selfUnit.x = p.x;
        this._selfUnit.y = p.y;
    }

    public updateMapUnitInfo(data: Array<BaseUnitInfo>) {
        console.log("updateMapUnitInfo", data);
        //下边计算多少范围内的数据需要请求详情信息
        
    }

    public updateMapDetailUnitInfo($info: {detailInfo:Array<any>,simpleInfo:Array<any>}) {
        console.log("updateMapDetailUnitInfo");
        let kIDs:Array<number> = [];
        let infoList = $info.detailInfo.concat($info.simpleInfo);

        for(let i = 0; i < infoList.length; i++) {
            if($info[i].kID == PlayerInfoMgr.instance.myOppID) {
                this.updateMyInfo($info[i]);
                gUIMgr.LayaStageEvent(EVENT.MY_UNIT_INFO);
                continue;
            }
            let unitInfo:WhaleUnitInfo = this._sideUnitInfo.get($info[i].kID);
            if(!unitInfo) unitInfo =  {kID:0, x:0, y:0, angle:0, speed:0, mapId:1, charName:"", skin:"", followId:0, attendant:[]};
            for (let key in $info[i]) {
                unitInfo[key] = $info[i][key];
            }
            this._sideUnitInfo.set($info[i].kID, unitInfo);
            kIDs.push(unitInfo.kID);
            //加入到对应map里
        }
        kIDs.length>0 && gUIMgr.LayaStageEvent(EVENT.UNIT_MOVE_INFO, kIDs); //触发移动更新
    }

    public updateMoveInfo($info:{kID:number, x:number, y:number, speed:number}) {
        let unitInfo:WhaleUnitInfo = this._sideUnitInfo.get($info.kID);
        for (let key in $info) {
            unitInfo[key] = $info[key];
        }
    }
}
