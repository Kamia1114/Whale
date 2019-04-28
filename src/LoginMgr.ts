enum LoadStep {
    LoadUIData,
    NAME_WND,
    TABLE,
    SCENE,
}
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
        Laya.stage.frameLoop(10, this, this._silenceAutoLoadThings);
    }

    private _silenceAutoLoadThings() {
        switch (this.loadStep) {
            case LoadStep.LoadUIData:
                this.loadUIData();
                break
            default:
                Laya.stage.clearTimer(this, this._silenceAutoLoadThings);
                break;
        }
    }

    /**
     *  加载UI数据
     */
    public loadUIData(): void {

    }


}