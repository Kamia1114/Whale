// 程序入口
//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
//

/** 启动页 */
class Main {
    // gGameUtill: GeGameUtill;
    gNet: GeGameNet;
    gLoginMgr: LoginMgr;
    gRaceTimerMgr: RaceTimerMgr;
    gUIMgr:UIMgr;
    gResMgr: ResMgr;
    loaderMgr: LoaderManager;
    //当前游戏的逻辑时间
    iGameTime: number = 0;

    constructor() {
        Config.isAlpha = true;

        Laya.init(Define.stageWidth, Define.stageHeight, Laya.WebGL);
        Laya.stage.screenMode = Define.screenMode;
        Laya.stage.scaleMode = Define.scaleMode;
        Laya.stage.frameRate = "mouse";
        Laya.stage.bgColor = Define.bgColor;

        //全局类创建
        this.gNet = new GeGameNet();             //网络
        this.gLoginMgr = new LoginMgr();         //登录
        this.gRaceTimerMgr = new RaceTimerMgr(); //跑计时器更新
        this.gUIMgr = new UIMgr();               //UI管理器
        this.gResMgr = new ResMgr();
        this.loaderMgr = new LoaderManager();


        Define.stat&&Laya.Stat.show();
        Laya.alertGlobalError = true;

    }
     
    public set loginStep(val:number) {
        console.log(val);
        switch(val) {
            case EnumLoginType.WX_CONNECTED:
                //跟微信授权完成 开始游戏资源加载
                gResMgr.startLoading();
                break;
            case EnumLoginType.Resource_COMPLETED:
                //资源加载完毕 连接服务器
                console.log("Resource complete");
                gNet.connect();
                break;
            case EnumLoginType.Login_CONNECTED:
                //网络连接成功了 请求个人信息
                console.log("login complete");
                gNet.getSelfInfo();
                break;
            case EnumLoginType.SelfInfo_COMPLETED:
                console.log("getInfo complete");
                gUIMgr.openWnd(WT.GAMESCENE_WND);
            case EnumLoginType.Enter_COMPLETED:
                //收到个人信息 进主界面
                //整个游戏就在这个计时器里运行
                Laya.timer.loop(Define.FrameTime, this, this.updateTime);
                break;
        }
    }

    private updateTime()
    {
        gRaceTimerMgr.update();
        //游戏时间计算先放这啦
        this.iGameTime += Define.FrameTime;
    }


}

// var gGameUtill: GeGameUtill;
var client: Main;
// var gGameMain:GameMain;
var gNet: GeGameNet;
var gLoginMgr: LoginMgr;
var gRaceTimerMgr: RaceTimerMgr;
var gUIMgr: UIMgr;
var gResMgr: ResMgr;
var loaderMgr: LoaderManager;

var gNative = new Native(() => {
    client = window['client'] = new Main();
    
    // gGameUtill = client.gGameUtill;
    gNet = client.gNet;
    gLoginMgr = client.gLoginMgr;
    gRaceTimerMgr = client.gRaceTimerMgr;
    gUIMgr = client.gUIMgr;
    gResMgr = client.gResMgr;
    loaderMgr = client.loaderMgr;
    gLoginMgr.start();
});