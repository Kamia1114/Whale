/**
 * 登录类
 */
var LoginMgr = /** @class */ (function () {
    function LoginMgr() {
        this.loadStep = 0;
    }
    LoginMgr.prototype.start = function () {
        if (window['_plt_'] == "wx") {
            this.loginInfo = new WXLogin(Laya.Handler.create(this, this._auth_finish_));
        }
        else {
            this._auth_finish_();
        }
    };
    /** 授权完毕加载资源 */
    LoginMgr.prototype._auth_finish_ = function () {
        client.loginStep = EnumLoginType.Login_CONNECTED;
        //这里本来应该有一个加载配置的
        //GameTable.startLoading();
        // 授权完成后开始游戏资源加载
        gResMgr.startLoading();
    };
    return LoginMgr;
}());
//# sourceMappingURL=LoginMgr.js.map