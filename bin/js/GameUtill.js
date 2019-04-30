/**
 * 游戏各类工具放在这里
 */
var GeGameUtill = /** @class */ (function () {
    function GeGameUtill() {
    }
    return GeGameUtill;
}());
var GeTool = /** @class */ (function () {
    function GeTool() {
    }
    GeTool.clone = function (object) {
        var out = {};
        if (object instanceof Array) {
            out = [];
        }
        if (typeof object == 'object') {
            for (var key in object) {
                if (typeof object[key] == 'function' || object[key] instanceof Laya.Handler) {
                    continue;
                }
                if (object[key] == null || typeof object[key] == "undefined") {
                    out[key] = null;
                }
                else if (typeof object[key] == 'object') {
                    out[key] = GeTool.clone(object[key]);
                }
                else {
                    out[key] = object[key];
                }
            }
        }
        else {
            out = object;
        }
        return out;
    };
    GeTool.copy = function (Dst, Src) {
        for (var key in Src) {
            Dst[key] = GeTool.clone(Src[key]);
        }
    };
    return GeTool;
}());
/**************** 全局函数（如非必要请勿使用全局函数, 往GeUtil里添加接口即可）  *********/
// var __lang = GeGameUtill.getLanguageTxt;
/**************** 全局函数End  ******************************************************/ 
//# sourceMappingURL=GameUtill.js.map