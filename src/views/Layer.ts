/*
* name;
*/
class Layer extends Laya.Sprite {
    constructor() {
        super();
        Laya.stage.on(Laya.Event.RESIZE, this, this._onResize);
    }

    public init(...arg) {
        for (var i = 0; arg && i < arg.length; i++) {
            var layerName = arg[i];
            var layer = new Layer();
            layer.width = Laya.stage.width;
            layer.height = Laya.stage.height;
            layer.mouseThrough = true;
            layer.name = layerName;
            this.addChild(layer);
        }
    }

    public getLayer(layerName: string) {
        var arr = layerName.split(".");
        var layer = this.getChildByName(arr.shift());
        while (layer && arr.length > 0) {
            layer = layer.getChildByName(arr.shift());
        }
        return layer;
    }

    public addToLayer(mc: Laya.Node, layerName: string = "", index: number = -1) {
        var layer = this.getChildByName(layerName);
        if (!layer) layer = this;
        index > 0 ? layer.addChildAt(mc, index) : layer.addChild(mc);
    }

    public removeLayerByName(layerName: string) {
        var layer = this.getChildByName(layerName);
        layer.removeChildren();
    }

    protected _onResize() {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
    }
}


//层级类型
const EnumLayerName = {
    Top: "top",                 //最顶上，系统通知跑马灯
    Pop: "pop",                 //弹出提示层
    GUI: "gui",                 //ui交互层
    Effect: "Effect",           //场景特效（上）
    Scene: "scene",             //主场景
    BgEffect: "bgEffect",       //背景特效
    Bg: "bg",                   //留着暂时没想到放啥
}