/*
* name;
*/
var IN_WX_GAME = false;
var Native = /** @class */ (function () {
    function Native(finish_cb) {
        this._btbFile = "";
        this._debugBTB = false;
        try {
            if (window["_plt_"] == 'wx') {
                IN_WX_GAME = true;
                console.assert = console.log;
                this.setMiniAdpter(finish_cb);
                if (Laya.Browser.onMobile || Laya.Browser.window.wx) {
                    window.alert = function () { };
                }
            }
            else {
                setTimeout(function () {
                    finish_cb();
                }, 1);
            }
        }
        catch (e) {
            setTimeout(function () {
                finish_cb();
            }, 1);
        }
    }
    Native.prototype.setMiniAdpter = function (cb) {
        Laya.MiniAdpter.init(cb);
        Laya.MiniAdpter.getUrlEncode = function (url, type) {
            var utf_list = [".fnt", ".json"];
            for (var i = 0; i < utf_list.length; i++) {
                if (url.indexOf(utf_list[i]) != -1)
                    return "utf8";
            }
            if (type == "arraybuffer")
                return "";
            return "ascii";
        };
    };
    Object.defineProperty(Native.prototype, "sdw", {
        get: function () {
            return window['sdw'] || null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取游戏版本号
     */
    Native.prototype.pub_ver = function () {
        return window['pub_ver'] || window['dev_ver'] || 0;
    };
    return Native;
}());
//# sourceMappingURL=Native.js.map