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
// import GameConfig from "./GameConfig";
var Main = /** @class */ (function () {
    function Main() {
        Config.isAlpha = true;
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        Laya.init(GameConfig.stageWidth, GameConfig.stageHeight, Laya.WebGL);
        Laya.stage.screenMode = GameConfig.screenMode;
        Laya.stage.scaleMode = GameConfig.scaleMode;
        Laya.stage.frameRate = "mouse";
        Laya.stage.bgColor = GameConfig.bgColor;
        // Laya.stage.alignH = "center";
        // Laya.stage.alignV = "middle";
        // laya.debug.DebugTool.init();
        GameConfig.stat && Laya.Stat.show();
        Laya.alertGlobalError = true;
        //激活资源版本控制
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(null, this.onLoadingCompleted), Laya.ResourceVersion.FILENAME_VERSION);
    }
    Main.prototype.netLogin = function () {
        if (GameConfig.debug) {
            gGameScene.start();
            return;
        }
        gNet.connect();
        gNet.on(NetSocket.SOCKET_EVENT.CONNECT, this, this._socketConnected);
    };
    Main.prototype.onLoadingCompleted = function () {
        //实例UI界面
        gNet = new GeGameNet();
        gTableMgr = new GeGameTable();
        gGameUtill = new GeGameUtill();
        gGameScene = new GameScene();
        this.netLogin();
    };
    Main.prototype._socketConnected = function () {
        //成功登陆了
        console.log("连上了");
        gGameScene.start();
    };
    /**
     * @param sceneType 当前加载的场景类型
     * @param isShow     true --> 显示，  false --> 隐藏
     */
    Main.prototype._showLoading = function () {
    };
    return Main;
}());
var gGameScene;
var gNet;
var gTableMgr;
var gGameUtill;
new Main();
//# sourceMappingURL=Main.js.map