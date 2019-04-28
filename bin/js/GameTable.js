/**
 * 游戏读表
 */
var GeGameTable = /** @class */ (function () {
    function GeGameTable() {
        this.TAB_LANGUAGE = "res/table/Language_CN.json";
        this.TAB_CONFIG = "res/table/Config.json";
    }
    GeGameTable.prototype._initLanguage = function () {
        var assets = [];
        assets.push({ url: this.TAB_LANGUAGE, type: Laya.Loader.JSON });
        Laya.loader.load(assets, Laya.Handler.create(this, this.onLoadComplete));
    };
    GeGameTable.prototype.onLoadComplete = function () {
        var json = Laya.loader.getRes(this.TAB_LANGUAGE);
        for (var key in json) {
            console.info("key:" + key + " ---> " + json[key]);
            this.m_languageRes[key] = json[key];
        }
    };
    GeGameTable.prototype.getLanguage = function (id) {
        return this.m_languageRes[id] ? this.m_languageRes[id] : "";
    };
    return GeGameTable;
}());
//# sourceMappingURL=GameTable.js.map