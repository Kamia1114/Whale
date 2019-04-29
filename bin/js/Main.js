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
        this.iGameTime = 0;
        Config.isAlpha = true;
        Laya.init(Define.stageWidth, Define.stageHeight, Laya.WebGL);
        Laya.stage.screenMode = Define.screenMode;
        Laya.stage.scaleMode = Define.scaleMode;
        Laya.stage.frameRate = "mouse";
        Laya.stage.bgColor = Define.bgColor;
        //全局类创建
        // gTableMgr = new GeGameTable();
        // gGameUtill = new GeGameUtill();
        this.gNet = new GeGameNet(); //网络
        this.gLoginMgr = new LoginMgr(); //登录
        // this.gGameMain = new GameMain();       //主场景
        this.gRaceTimerMgr = new RaceTimerMgr(); //跑计时器更新
        this.gUIMgr = new UIMgr(); //UI管理器
        //
        this.m_RaceTimerMgr = new RaceTimerMgr();
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
                    break;
                case EnumLoginType.Game_START:
                    //玩家点击触发游戏开始
                    this.startUpdate();
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    //游戏开始时注册一些主循环update
    Main.prototype.startUpdate = function () {
        //更新单位动作,分开更新因为这个频率要高些
        Laya.timer.loop(Define.FrameTime, this, this._updateTime);
    };
    Main.prototype._updateTime = function () {
        //游戏时间的更新
        this.m_RaceTimerMgr.update();
    };
    return Main;
}());
// var gTableMgr: GeGameTable;
// var gGameUtill: GeGameUtill;
var client;
// var gGameMain:GameMain;
var gNet;
var gLoginMgr;
var gRaceTimerMgr;
var gUIMgr;
var gNative = new Native(function () {
    client = window['client'] = new Main();
    // gTableMgr = client.gTableMgr;
    // gGameUtill = client.gGameUtill;
    // gGameMain = client.gGameMain;
    gNet = client.gNet;
    gLoginMgr = client.gLoginMgr;
    gRaceTimerMgr = client.gRaceTimerMgr;
    gUIMgr = client.gUIMgr;
    gLoginMgr.start();
});
//# sourceMappingURL=Main.js.map