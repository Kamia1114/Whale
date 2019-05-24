var Manager;
(function (Manager) {
    var PlayerInfoMgr = /** @class */ (function () {
        function PlayerInfoMgr() {
            gUIMgr.LayaStageOn(this, S_EVENT.G_PLAYER_INFO, this, this._updatePlayerInfo);
        }
        Object.defineProperty(PlayerInfoMgr, "instance", {
            //点赞数什么的... 再说
            get: function () {
                if (this._instance == null)
                    this._instance = new PlayerInfoMgr();
                return this.instance;
            },
            enumerable: true,
            configurable: true
        });
        PlayerInfoMgr.prototype._updatePlayerInfo = function (info) {
            this._charName = info.charName;
            this._sex = info.sex;
            this._popNum = info.v;
            this._word = info.word;
            gUIMgr.LayaStageEvent(G_EVENT.GameInfo_Get, "playerinfo");
        };
        return PlayerInfoMgr;
    }());
    Manager.PlayerInfoMgr = PlayerInfoMgr;
})(Manager || (Manager = {}));
//# sourceMappingURL=PlayerInfoMgr.js.map