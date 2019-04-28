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

class WXLogin{

    private _data_url: Object = {};
    private _finish_cb: Laya.Handler;

    public GetParamString(name) {
        if (this._data_url[name] != null) return this._data_url[name];
        else console.log("WXLogin:error --- >", name);
    }

    constructor(finish_cb: Laya.Handler) {
        this._check_();
        this._finish_cb = finish_cb;
    }

    private _check_() {
        window['wxsdw'] && window['wxsdw'].getAuthInfo({
            ignore: true,
            success: this._auth_info_cb_.bind(this),
            fail: this._auth_info_fail_.bind(this)
        });
    }
    
    private _auth_info_cb_(data) {
        this._data_url = data;

        // 初始化微信SDK
        let wx_share = Laya.Browser.window.wx.getLaunchOptionsSync().query;
        console.log(wx_share);
        for (var key in wx_share) {
            if (key == 'appid') continue;
            this[key] = wx_share[key];
        }
    }

    private _auth_info_fail_(res) {
        console.log(res.msg);
        // if (gUIMgr) gUIMgr.LayaStageEvent("wxopenaccess");

        this._wx_force_login_();
    }

    private _show_force_count = 0;

    private _wx_force_login_() {
        this.createLoginBtn((res) => {
            window['wxsdw'].reAuth(res.userInfo);
        })
    }

    /**
     * 上报服务器的登陆信息
     */
    create_logininfo() {
        let sp = {};
        if (window['wxsdw'] && window['wxsdw'].wxUserInfo) {
            sp['wxinfo'] = window['wxsdw'].wxUserInfo
        }

        return sp;
    }

    /**
     * 发送注册事件
     * @param data 
     */
    public sendLoginEvent(data: any) {
        if (Laya.Browser.window.wx && Laya.Browser.window.wx.getLaunchOptionsSync) {
            var onShowRes: any = Laya.Browser.window.wx.getLaunchOptionsSync();
        }
    }

    /**设置保持常亮状态 */
    setKeepScreenOn(bool: boolean) {
        let fn = this._list_call("wx.setKeepScreenOn");
        if (fn) {
            fn({ keepScreenOn: bool });
        }
    }

    public createLoginBtn(cb:Function) {
        let _show_force_count = 0;
        let bt;
        let w = 3000;
        let h = 2000;
        let w_x = (Laya.Browser.clientWidth - w) / 2;
        let h_y = (Laya.Browser.clientHeight - h) / 2;

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
        
        bt.onTap((res) => {
            _show_force_count++;
            if (res && res.userInfo) {
                cb(res);
                bt.destroy();
            }
            else {
                console.log('发起拒绝了');
                if (_show_force_count > 2) {
                    //退出小程序
                    this.SDK.exitMiniProgram();
                }
            }
        })

    }

    protected _list_call(api: string) {
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
    }

    get SDK():any {
        return Laya.Browser.window.wx;
    }
}