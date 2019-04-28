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
class GameMain {
    // gTableMgr: GeGameTable;
    // gGameUtill: GeGameUtill;
    gGameScene:GameScene;
    gNet: GeGameNet;
    gLoginMgr: LoginMgr;
    gRaceTimerMgr: RaceTimerMgr

    constructor() {
        Config.isAlpha = true;

        Laya.init(Define.stageWidth, Define.stageHeight, Laya.WebGL);
        Laya.stage.screenMode = Define.screenMode;
        Laya.stage.scaleMode = Define.scaleMode;
        Laya.stage.frameRate = "mouse";
        Laya.stage.bgColor = Define.bgColor;

        //实例各主类
        
        // gTableMgr = new GeGameTable();
        // gGameUtill = new GeGameUtill();
        gNet = new GeGameNet();             //网络
        gLoginMgr = new LoginMgr();         //登录
        gGameScene = new GameScene();       //主场景
        gRaceTimerMgr = new RaceTimerMgr(); //游戏更新

        Define.stat&&Laya.Stat.show();
        Laya.alertGlobalError = true;

    }
     
    public set loginStep(val:number) {
        console.log(val);
        switch(val) {
            case EnumLoginType.Net_CONNECTED:
                
                break;
            default :
                this.startUpdate();
                break;
        }
    }

    //游戏开始时注册一些主循环update
    public startUpdate(): void {
        //更新单位动作,分开更新因为这个频率要高些
        Laya.timer.loop(Define.FrameTime, this, this._updateTime);
    }

    private _updateTime()
    {

    }


}

// var gTableMgr: GeGameTable;
// var gGameUtill: GeGameUtill;
var client: GameMain;
var gGameScene:GameScene;
var gNet: GeGameNet;
var gLoginMgr: LoginMgr;
var gRaceTimerMgr: RaceTimerMgr;

var gNative = new Native(() => {
    client = window['client'] = new GameMain();
    
    // gTableMgr = client.gTableMgr;
    // gGameUtill = client.gGameUtill;
    gGameScene = client.gGameScene;
    gNet = client.gNet;
    gLoginMgr = client.gLoginMgr;
    gRaceTimerMgr = client.gRaceTimerMgr;
    gLoginMgr.start();
});