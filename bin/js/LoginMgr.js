var LoadStep;
(function (LoadStep) {
    LoadStep[LoadStep["ConfigData"] = 0] = "ConfigData";
    LoadStep[LoadStep["LoadUIData"] = 1] = "LoadUIData";
    LoadStep[LoadStep["NAME_WND"] = 2] = "NAME_WND";
    // TABLE,
    // SCENE,
})(LoadStep || (LoadStep = {}));
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
        //分段式加载
        Laya.stage.frameLoop(10, this, this._silenceAutoLoadThings);
    };
    LoginMgr.prototype._silenceAutoLoadThings = function () {
        switch (this.loadStep) {
            case LoadStep.ConfigData:
                this.loadConig();
                break;
            case LoadStep.LoadUIData:
                this.loadUIData();
                break;
            default:
                Laya.stage.clearTimer(this, this._silenceAutoLoadThings);
                client.loginStep = EnumLoginType.Resource_COMPLETED;
                break;
        }
    };
    /**
     * 加载配置
     */
    LoginMgr.prototype.loadConig = function () {
        //... 暂时没想好load什么
        this.loadStep++;
    };
    /**
     *  加载UI数据
     */
    LoginMgr.prototype.loadUIData = function () {
        //... 暂时没想好load什么
        this.loadStep++;
    };
    return LoginMgr;
}());
//# sourceMappingURL=LoginMgr.js.map