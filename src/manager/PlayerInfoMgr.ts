module Manager {
    export class PlayerInfoMgr{
        private static _instance: PlayerInfoMgr;
        //角色名字
        private _charName:string;
        //性别
        private _sex:number;
        //气泡数量
        private _popNum:number;
        //当前签名
        private _word:string;
        //点赞数什么的... 再说

        public static get instance(): PlayerInfoMgr {
            if(this._instance == null)
                this._instance = new PlayerInfoMgr();
            return this.instance;
        }

        
        constructor() { 
            gUIMgr.LayaStageOn(this, S_EVENT.G_PLAYER_INFO, this, this._updatePlayerInfo);
        }
        
        private _updatePlayerInfo(info:any)
        {
            this._charName = info.charName;
            this._sex = info.sex;
            this._popNum = info.v;
            this._word = info.word;
            gUIMgr.LayaStageEvent(G_EVENT.GameInfo_Get, "playerinfo");
        }
    }
}
    
