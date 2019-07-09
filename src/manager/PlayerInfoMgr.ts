class PlayerInfoMgr{
    private static _instance: PlayerInfoMgr;
    public myOppID = "5456";
    // kid
    private _kID:number;
    //角色名字
    private _charName:string;
    //性别 0女， 1男
    private _sex:number;
    //气泡数量
    private _popNum:number;
    //当前签名
    private _word:string;
    //点赞数什么的... 再说

    static get instance(): PlayerInfoMgr {
        !this._instance && (this._instance = new PlayerInfoMgr());
        return this._instance;
    }
    
    constructor() { 
    }
    
    public updatePlayerInfo(info:any)
    {
        this._kID = info.kID;
        this._charName = info.charName;
        this._sex = info.sex;
        this._popNum = info.popNum;
        this._word = info.word;
        gUIMgr.LayaStageEvent(EVENT.PLAYER_INFO);
    }

    public get kID(): number {
        return this._kID;
    }
}

    
