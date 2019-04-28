/*
* name;
*/
var IN_WX_GAME = false;

class Native {
    private _btbFile: string = "";
    private _debugBTB: boolean = false;
    constructor(finish_cb: () => void) {
        try {
            if (window["_plt_"] == 'wx') {
                IN_WX_GAME = true;
                console.assert = console.log;
                this.setMiniAdpter(finish_cb);
                if (Laya.Browser.onMobile || Laya.Browser.window.wx) {
                    window.alert = function () { }
                }
            }
            else {
                setTimeout(() => {
                    finish_cb();
                }, 1)
            }
        }
        catch (e) {
            setTimeout(() => {
                finish_cb();
            }, 1)
        }
    }

    public setMiniAdpter(cb) {
        Laya.MiniAdpter.init(cb);
        Laya.MiniAdpter.getUrlEncode = function (url: String, type: String) {
            var utf_list = [".fnt", ".json"]
            for (let i = 0; i < utf_list.length; i++) {
                if (url.indexOf(utf_list[i]) != -1)
                    return "utf8";
            }

            if (type == "arraybuffer")
                return "";
            return "ascii";
        }
    }

    get sdw() {
        return window['sdw'] || null;
    }

    /**
     * 获取游戏版本号
     */
    pub_ver(): number {
        return window['pub_ver'] || window['dev_ver'] || 0;
    }
}