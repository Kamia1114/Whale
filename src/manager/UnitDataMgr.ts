class UnitDataMgr{
    private static _instance: UnitDataMgr;
    /** 自己 */
    private _selfUnit: WhaleUnitInfo;
    /** 简短信息 */
    private _mapUnitInfo: Array<WhaleShortInfo>;
    /** 周围用户详情信息 */
    private _sideUnitInfo: Array<WhaleUnitInfo>;

    static get instance(): UnitDataMgr {
        if( this._instance == null)
            this._instance = new UnitDataMgr();
        return this._instance;
    }
    
    constructor() { 
        gUIMgr.LayaStageOn(this, S_EVENT.G_MYUNIT_INFO, this, this._updateMyInfo);
        gUIMgr.LayaStageOn(this, S_EVENT.G_MAPSHORT_INFO, this, this._updateMapUnitInfo);
        gUIMgr.LayaStageOn(this, S_EVENT.G_MAPDETAIL_INFO, this, this._updateMapDetailUnitInfo);
    }

    private _updateMyInfo(info: WhaleUnitInfo) {
        console.log("updateMyInfo", info);
        for (var key in info){
            if(!this._selfUnit[key] || this._selfUnit[key] != info[key]) {
                //数据变动了
                this._selfUnit[key] = info[key];
            }
        }
    }

    public getSelfInfo(): WhaleUnitInfo
    {
        return this._selfUnit;
    }

    private _updateMapUnitInfo(infos: Array<any>) {
        console.log("updateMapUnitInfo", infos);
        //下边计算多少范围内的数据需要请求详情信息

    }

    private _updateMapDetailUnitInfo(infos: Array<any>) {
        console.log("updateMapDetailUnitInfo", infos);
    }
}
