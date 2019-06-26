class Define{
    static isTest = true;
    static stageWidth = 750;
    static stageHeight = 1334;
    static scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
    static screenMode = Laya.Stage.SCREEN_VERTICAL;
    static bgColor = "#232628";
    static debug = true;
    static stat = true;
    static FrameTime:number = 33; //逻辑一帧的时间

    static speedNormal = 50;    //一秒50距离
    static speedFast = 100;     //加速状态100
    static mapWidth = 6000;     //默认地图宽
    static mapHeigh = 6000;     //默认地图高

    static twConstVal = 5;       //移动tween，暂时设定5000ms，移动至计算出5秒后的位置
    constructor(){

    }
}

//Layer.ts 层级类型
const EnumLayerName = {
    Top: "top",                 //最顶上，系统通知跑马灯
    Pop: "pop",                 //弹出提示层
    GUI: "gui",                 //ui交互层
    Effect: "Effect",           //场景特效（上）
    Scene: "scene",             //主场景
    BgEffect: "bgEffect",       //背景特效
    Bg: "bg",                   //留着暂时没想到放啥
}

/** 登录状态 */
enum EnumLoginType {
    /** 网络接上了 */
    Login_CONNECTED,
    /** 配置加载完毕 */
    Config_COMPLETED,
    /** 资源加载完毕 */
    Resource_COMPLETED,
    /** 界面进去了 */
    Enter_COMPLETED,
    /** 玩家点了开始 */
    Start,
}

//窗口
enum WT {
    //主场景
    GAMESCENE_WND
    //
}


class HashMap<T>{
    _data = {};

    constructor(_data?: Object) {
        if (_data) {
            this._data = _data;
        }
    }

    get(key: string | number) {
        if(!this._data[key]) return null;
        return <T>this._data[key];
    }

    set(key: string | number, v: T) {
        this._data[key] = v;
    }

    get keys() {
        return Object.keys(this._data);
    }

    del(key: string | number) {
        delete this._data[key];
    }

    clear() {
        this._data = {};
    }
}