enum LoadStep {
    ConfigData,
    LoadUIData,
    NAME_WND,
    // TABLE,
    // SCENE,
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
        //分段式加载
        Laya.stage.frameLoop(10, this, this._silenceAutoLoadThings);
    }

    private _silenceAutoLoadThings() {
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
    }
    
    /**
     * 加载配置
     */
    private loadConig(): void {
        //... 暂时没想好load什么
        this.loadStep++;
    }

    /**
     *  加载UI数据
     */
    private loadUIData(): void {
        //... 暂时没想好load什么
        this.loadStep++;
    }

}