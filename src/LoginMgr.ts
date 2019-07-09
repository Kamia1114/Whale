/**
 * 登录类
 */
class LoginMgr {

    public loginInfo: WXLogin;
    private loadStep: number = 0;

    constructor() {
    }

    public start() {
        if(window['_plt_'] == "wx") {
            this.loginInfo = new WXLogin(Laya.Handler.create(this, this._auth_finish_));
        } else {
            this._auth_finish_();
        }
        
    }

    /** 授权完毕加载资源 */
    private _auth_finish_() {
        client.loginStep = EnumLoginType.WX_CONNECTED;
        //这里本来应该有一个加载配置的
        //GameTable.startLoading();
    }

}