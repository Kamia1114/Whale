class Define{
    static stageWidth = 750;
    static stageHeight = 1334;
    static scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
    static screenMode = Laya.Stage.SCREEN_VERTICAL;
    static bgColor = "#232628";
    static debug = true;
    static stat = true;
    static FrameTime:number = 33; //逻辑一帧的时间
    constructor(){

    }
}

interface GameNet {
    url:string,
}

/** 商品类型 */
enum EnumLoginType {
    /** 网络接上了 */
    Net_CONNECTED,
    /** 配置加载完毕 */
    Config_COMPLETED,
    /** 充值 */
    Charge,
}

//窗口
enum WT {
    //主场景
    GAMESCENE_WND
    //
}