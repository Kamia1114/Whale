/**
 * 需要在 game.js 中注入一些代码，在这里说明一下
 *
 * var SDWMiniSDK = require("SDWMiniSDK.min.js");
    window.sdwSdk = new SDWMiniSDK({
    wxAppId: "wxdba811af3ac0f3b5",     // 微信小游戏的APPID
    channel: "10780",   // 平台给予的平台ID，默认
    appId: "2055448779",      // 闪电玩平台的appid
    useSdw: false,         // 是否在H5版本中自动注入sdw，dhpay文件
    });
    *
    *
    */
var WXLogin = /** @class */ (function () {
    function WXLogin(finish_cb) {
        this._data_url = {};
        this._show_force_count = 0;
        this._check_();
        this._finish_cb = finish_cb;
    }
    WXLogin.prototype.GetParamString = function (name) {
        if (this._data_url[name] != null)
            return this._data_url[name];
        else
            console.log("WXLogin:error --- >", name);
    };
    WXLogin.prototype._check_ = function () {
        window['wxsdw'] && window['wxsdw'].getAuthInfo({
            ignore: true,
            success: this._auth_info_cb_.bind(this),
            fail: this._auth_info_fail_.bind(this)
        });
    };
    WXLogin.prototype._auth_info_cb_ = function (data) {
        this._data_url = data;
        // 初始化微信SDK
        var wx_share = Laya.Browser.window.wx.getLaunchOptionsSync().query;
        console.log(wx_share);
        for (var key in wx_share) {
            if (key == 'appid')
                continue;
            this[key] = wx_share[key];
        }
    };
    WXLogin.prototype._auth_info_fail_ = function (res) {
        console.log(res.msg);
        // if (gUIMgr) gUIMgr.LayaStageEvent("wxopenaccess");
        this._wx_force_login_();
    };
    WXLogin.prototype._wx_force_login_ = function () {
        this.createLoginBtn(function (res) {
            window['wxsdw'].reAuth(res.userInfo);
        });
    };
    /**
     * 上报服务器的登陆信息
     */
    WXLogin.prototype.create_logininfo = function () {
        var sp = {};
        if (window['wxsdw'] && window['wxsdw'].wxUserInfo) {
            sp['wxinfo'] = window['wxsdw'].wxUserInfo;
        }
        return sp;
    };
    /**
     * 发送注册事件
     * @param data
     */
    WXLogin.prototype.sendLoginEvent = function (data) {
        if (Laya.Browser.window.wx && Laya.Browser.window.wx.getLaunchOptionsSync) {
            var onShowRes = Laya.Browser.window.wx.getLaunchOptionsSync();
        }
    };
    /**设置保持常亮状态 */
    WXLogin.prototype.setKeepScreenOn = function (bool) {
        var fn = this._list_call("wx.setKeepScreenOn");
        if (fn) {
            fn({ keepScreenOn: bool });
        }
    };
    WXLogin.prototype.createLoginBtn = function (cb) {
        var _this = this;
        var _show_force_count = 0;
        var bt;
        var w = 3000;
        var h = 2000;
        var w_x = (Laya.Browser.clientWidth - w) / 2;
        var h_y = (Laya.Browser.clientHeight - h) / 2;
        bt = this.SDK.createUserInfoButton({
            type: 'image',
            image: "image/denglu.png",
            style: {
                left: w_x,
                top: h_y,
                width: w,
                height: h,
            }
        });
        bt.onTap(function (res) {
            _show_force_count++;
            if (res && res.userInfo) {
                cb(res);
                bt.destroy();
            }
            else {
                console.log('发起拒绝了');
                if (_show_force_count > 2) {
                    //退出小程序
                    _this.SDK.exitMiniProgram();
                }
            }
        });
    };
    WXLogin.prototype._list_call = function (api) {
        var list = api.split('.');
        var baseObj = null;
        try {
            baseObj = window || null;
        }
        catch (e) {
            baseObj = null;
        }
        for (var i = 0; i < list.length; i++) {
            if (baseObj && baseObj.hasOwnProperty(list[i])) {
                baseObj = baseObj[list[i]];
            }
            else {
                baseObj = null;
                break;
            }
        }
        return baseObj;
    };
    Object.defineProperty(WXLogin.prototype, "SDK", {
        get: function () {
            return Laya.Browser.window.wx;
        },
        enumerable: true,
        configurable: true
    });
    return WXLogin;
}());
//# sourceMappingURL=WXLogin.js.map