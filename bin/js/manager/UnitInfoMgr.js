var UnitInfoMgr = /** @class */ (function () {
    function UnitInfoMgr() {
    }
    Object.defineProperty(UnitInfoMgr, "instance", {
        get: function () {
            !this._instance && (this._instance = new UnitInfoMgr());
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    UnitInfoMgr.prototype.updateMyInfo = function (info) {
        console.log("updateMyInfo", info);
        for (var key in info) {
            if (!this._selfUnit[key] || this._selfUnit[key] != info[key]) {
                //数据变动了
                this._selfUnit[key] = info[key];
            }
        }
    };
    Object.defineProperty(UnitInfoMgr.prototype, "selfInfo", {
        get: function () {
            return this._selfUnit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UnitInfoMgr.prototype, "selfPoint", {
        set: function (p) {
            this._selfUnit.x = p.x;
            this._selfUnit.y = p.y;
        },
        enumerable: true,
        configurable: true
    });
    UnitInfoMgr.prototype.updateMapUnitInfo = function (data) {
        console.log("updateMapUnitInfo", data);
        //下边计算多少范围内的数据需要请求详情信息
    };
    UnitInfoMgr.prototype.updateMapDetailUnitInfo = function ($info) {
        console.log("updateMapDetailUnitInfo");
        if (!this._sideUnitInfo) {
            this._sideUnitInfo = new HashMap();
        }
        var kIDs = [];
        for (var i = 0; i < $info.length; i++) {
            var unitInfo = this._sideUnitInfo.get($info[i].kId);
            if (!unitInfo)
                unitInfo = { skin: "", followId: 0, attendant: [], isSelf: false, kID: 0, x: 0, y: 0, angle: 0, speed: false, mapId: 1 };
            for (var key in $info[i]) {
                unitInfo[key] = $info[i][key];
            }
            this._sideUnitInfo.set($info[i].kId, unitInfo);
            kIDs.push(unitInfo.kID);
            //加入到对应map里
        }
        kIDs.length > 0 && gUIMgr.LayaStageEvent(G_EVENT.UNIT_MOVE_INFO, kIDs); //触发移动更新
    };
    return UnitInfoMgr;
}());
//# sourceMappingURL=UnitInfoMgr.js.map