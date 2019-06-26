var Define = /** @class */ (function () {
    function Define() {
    }
    Define.isTest = true;
    Define.stageWidth = 750;
    Define.stageHeight = 1334;
    Define.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
    Define.screenMode = Laya.Stage.SCREEN_VERTICAL;
    Define.bgColor = "#232628";
    Define.debug = true;
    Define.stat = true;
    Define.FrameTime = 33; //逻辑一帧的时间
    Define.speedNormal = 50; //一秒50距离
    Define.speedFast = 100; //加速状态100
    Define.mapWidth = 6000; //默认地图宽
    Define.mapHeigh = 6000; //默认地图高
    Define.twConstVal = 5; //移动tween，暂时设定5000ms，移动至计算出5秒后的位置
    return Define;
}());
//Layer.ts 层级类型
var EnumLayerName = {
    Top: "top",
    Pop: "pop",
    GUI: "gui",
    Effect: "Effect",
    Scene: "scene",
    BgEffect: "bgEffect",
    Bg: "bg",
};
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
    /** 玩家点了开始 */
    EnumLoginType[EnumLoginType["Start"] = 4] = "Start";
})(EnumLoginType || (EnumLoginType = {}));
//窗口
var WT;
(function (WT) {
    //主场景
    WT[WT["GAMESCENE_WND"] = 0] = "GAMESCENE_WND";
    //
})(WT || (WT = {}));
var HashMap = /** @class */ (function () {
    function HashMap(_data) {
        this._data = {};
        if (_data) {
            this._data = _data;
        }
    }
    HashMap.prototype.get = function (key) {
        if (!this._data[key])
            return null;
        return this._data[key];
    };
    HashMap.prototype.set = function (key, v) {
        this._data[key] = v;
    };
    Object.defineProperty(HashMap.prototype, "keys", {
        get: function () {
            return Object.keys(this._data);
        },
        enumerable: true,
        configurable: true
    });
    HashMap.prototype.del = function (key) {
        delete this._data[key];
    };
    HashMap.prototype.clear = function () {
        this._data = {};
    };
    return HashMap;
}());
//# sourceMappingURL=Define.js.map