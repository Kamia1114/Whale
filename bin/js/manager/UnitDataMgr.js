var UnitDataMgr = /** @class */ (function () {
    function UnitDataMgr() {
        gUIMgr.LayaStageOn(this, S_EVENT.G_MYUNIT_INFO, this, this._updateMyInfo);
        gUIMgr.LayaStageOn(this, S_EVENT.G_MAPSHORT_INFO, this, this._updateMapUnitInfo);
        gUIMgr.LayaStageOn(this, S_EVENT.G_MAPDETAIL_INFO, this, this._updateMapDetailUnitInfo);
    }
    Object.defineProperty(UnitDataMgr, "instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new UnitDataMgr();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    UnitDataMgr.prototype._updateMyInfo = function (info) {
        console.log("updateMyInfo", info);
        for (var key in info) {
            if (!this._selfUnit[key] || this._selfUnit[key] != info[key]) {
                //数据变动了
                this._selfUnit[key] = info[key];
            }
        }
    };
    Object.defineProperty(UnitDataMgr.prototype, "selfInfo", {
        get: function () {
            return this._selfUnit;
        },
        enumerable: true,
        configurable: true
    });
    UnitDataMgr.prototype._updateMapUnitInfo = function (infos) {
        console.log("updateMapUnitInfo", infos);
        //下边计算多少范围内的数据需要请求详情信息
    };
    UnitDataMgr.prototype._updateMapDetailUnitInfo = function (infos) {
        console.log("updateMapDetailUnitInfo", infos);
    };
    return UnitDataMgr;
}());
//# sourceMappingURL=UnitDataMgr.js.map