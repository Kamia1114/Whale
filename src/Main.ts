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
    // gTableMgr: GeGameTable;
    // gGameUtill: GeGameUtill;
    gGameMain:GameMain;
    gNet: GeGameNet;
    gLoginMgr: LoginMgr;
    gRaceTimerMgr: RaceTimerMgr;
    gUIMgr:UIMgr;

    public iGameTime = 0;
    m_RaceTimerMgr: RaceTimerMgr;

    constructor() {
        Config.isAlpha = true;

        Laya.init(Define.stageWidth, Define.stageHeight, Laya.WebGL);
        Laya.stage.screenMode = Define.screenMode;
        Laya.stage.scaleMode = Define.scaleMode;
        Laya.stage.frameRate = "mouse";
        Laya.stage.bgColor = Define.bgColor;

        //全局类创建
        // gTableMgr = new GeGameTable();
        // gGameUtill = new GeGameUtill();
        this.gNet = new GeGameNet();             //网络
        this.gLoginMgr = new LoginMgr();         //登录
        this.gGameMain = new GameMain();       //主场景
        this.gRaceTimerMgr = new RaceTimerMgr(); //跑计时器更新
        this.gUIMgr = new UIMgr();               //UI管理器
        //
        this.m_RaceTimerMgr = new RaceTimerMgr();


        Define.stat&&Laya.Stat.show();
        Laya.alertGlobalError = true;

    }
     
    public set loginStep(val:number) {
        console.log(val);
        switch(val) {
            case EnumLoginType.Login_CONNECTED:
                //网络连上了，下一步
                
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
        //游戏时间的更新
        this.m_RaceTimerMgr.update();
    }


}

// var gTableMgr: GeGameTable;
// var gGameUtill: GeGameUtill;
var client: Main;
var gGameMain:GameMain;
var gNet: GeGameNet;
var gLoginMgr: LoginMgr;
var gRaceTimerMgr: RaceTimerMgr;
var gUIMgr: UIMgr;

var gNative = new Native(() => {
    client = window['client'] = new Main();
    
    // gTableMgr = client.gTableMgr;
    // gGameUtill = client.gGameUtill;
    gGameMain = client.gGameMain;
    gNet = client.gNet;
    gLoginMgr = client.gLoginMgr;
    gRaceTimerMgr = client.gRaceTimerMgr;
    gUIMgr = client.gUIMgr;
    gLoginMgr.start();
});