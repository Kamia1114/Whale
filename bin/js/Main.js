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
var Main = /** @class */ (function () {
    function Main() {
        //当前游戏的逻辑时间
        this.iGameTime = 0;
        Config.isAlpha = true;
        Laya.init(Define.stageWidth, Define.stageHeight, Laya.WebGL);
        Laya.stage.screenMode = Define.screenMode;
        Laya.stage.scaleMode = Define.scaleMode;
        Laya.stage.frameRate = "mouse";
        Laya.stage.bgColor = Define.bgColor;
        //全局类创建
        this.gNet = new GeGameNet(); //网络
        this.gLoginMgr = new LoginMgr(); //登录
        this.gRaceTimerMgr = new RaceTimerMgr(); //跑计时器更新
        this.gUIMgr = new UIMgr(); //UI管理器
        this.gResMgr = new ResMgr();
        this.loaderMgr = new LoaderManager();
        Define.stat && Laya.Stat.show();
        Laya.alertGlobalError = true;
    }
    Object.defineProperty(Main.prototype, "loginStep", {
        set: function (val) {
            console.log(val);
            switch (val) {
                case EnumLoginType.Login_CONNECTED:
                    //网络连上了，下一步
                    console.log("login complete");
                    break;
                case EnumLoginType.Config_COMPLETED:
                    //资源加载完毕
                    console.log("config complete");
                    break;
                case EnumLoginType.Resource_COMPLETED:
                    //资源加载完毕 可以进去了
                    console.log("Resource complete");
                    gUIMgr.openWnd(WT.GAMESCENE_WND);
                    break;
                case EnumLoginType.Enter_COMPLETED:
                    //走到这 游戏界面进去了
                    console.log("enter complete");
                    //整个游戏就在这个计时器里运行
                    Laya.timer.loop(Define.FrameTime, this, this.updateTime);
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    Main.prototype.updateTime = function () {
        gRaceTimerMgr.update();
        //游戏时间计算先放这啦
        this.iGameTime += Define.FrameTime;
    };
    return Main;
}());
// var gGameUtill: GeGameUtill;
var client;
// var gGameMain:GameMain;
var gNet;
var gLoginMgr;
var gRaceTimerMgr;
var gUIMgr;
var gResMgr;
var loaderMgr;
var gNative = new Native(function () {
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
//# sourceMappingURL=Main.js.map