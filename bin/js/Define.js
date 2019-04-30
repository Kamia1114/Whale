var Define = /** @class */ (function () {
    function Define() {
    }
    Define.stageWidth = 750;
    Define.stageHeight = 1334;
    Define.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
    Define.screenMode = Laya.Stage.SCREEN_VERTICAL;
    Define.bgColor = "#232628";
    Define.debug = true;
    Define.stat = true;
    Define.FrameTime = 33; //逻辑一帧的时间
    return Define;
}());
/** 登录状态 */
var EnumLoginType;
(function (EnumLoginType) {
    /** 网络接上了 */
    EnumLoginType[EnumLoginType["Login_CONNECTED"] = 0] = "Login_CONNECTED";
    /** 配置加载完毕 */
    EnumLoginType[EnumLoginType["Config_COMPLETED"] = 1] = "Config_COMPLETED";
    /** 资源加载完毕 */
    EnumLoginType[EnumLoginType["Resource_COMPLETED"] = 2] = "Resource_COMPLETED";
    /** 界面进去了 */
    EnumLoginType[EnumLoginType["Enter_COMPLETED"] = 3] = "Enter_COMPLETED";
    /** 玩家点击开始 */
    EnumLoginType[EnumLoginType["Game_START"] = 4] = "Game_START";
})(EnumLoginType || (EnumLoginType = {}));
//窗口
var WT;
(function (WT) {
    //主场景
    WT[WT["GAMESCENE_WND"] = 0] = "GAMESCENE_WND";
    //
})(WT || (WT = {}));
//# sourceMappingURL=Define.js.map