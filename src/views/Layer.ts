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
        return this.getChildByName(layerName);
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