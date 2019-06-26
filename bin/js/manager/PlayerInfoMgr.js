var PlayerInfoMgr = /** @class */ (function () {
    function PlayerInfoMgr() {
        this.myOppID = "5456";
    }
    Object.defineProperty(PlayerInfoMgr, "instance", {
        //点赞数什么的... 再说
        get: function () {
            !this._instance && (this._instance = new PlayerInfoMgr());
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    PlayerInfoMgr.prototype.updatePlayerInfo = function (info) {
        this._kID = info.kID;
        this._charName = info.charName;
        this._sex = info.sex;
        this._popNum = info.v;
        this._word = info.word;
        gUIMgr.LayaStageEvent(G_EVENT.PLAYER_INFO);
    };
    Object.defineProperty(PlayerInfoMgr.prototype, "kID", {
        get: function () {
            return this._kID;
        },
        enumerable: true,
        configurable: true
    });
    return PlayerInfoMgr;
}());
//# sourceMappingURL=PlayerInfoMgr.js.map