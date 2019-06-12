class UnitInfoMgr{
    private static _instance: UnitInfoMgr;
    /** 自己 */
    private _selfUnit: WhaleUnitInfo;
    /** 简短信息 */
    private _mapUnitInfo: Array<WhaleShortInfo>;
    /** 周围用户详情信息 */
    private _sideUnitInfo: Array<WhaleUnitInfo>;

    static get instance(): UnitInfoMgr {
        if( this._instance == null)
            this._instance = new UnitInfoMgr();
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

    public updateMapUnitInfo(infos: Array<any>) {
        console.log("updateMapUnitInfo", infos);
        //下边计算多少范围内的数据需要请求详情信息

    }

    public updateMapDetailUnitInfo(infos: Array<WhaleUnitInfo>) {
        console.log("updateMapDetailUnitInfo", infos);
        let myKID = PlayerInfoMgr.instance.kID;
        for(let i = 0; i < infos.length; i++) {
            let info = infos[i];
            //加入到对应map里
        }
    }
}
