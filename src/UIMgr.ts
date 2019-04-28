class GeUIMgr {
    uiLayer: Layer;

    constructor() {
        this.uiLayer = new Layer();
        this.uiLayer.init(EnumLayerName.Bg, EnumLayerName.BgEffect, EnumLayerName.Scene, EnumLayerName.Effect, EnumLayerName.GUI, EnumLayerName.Pop, EnumLayerName.Top);
        Laya.stage.addChild(this.uiLayer);
        this.registerWnd();
    }

    private registerWnd()
    {
        
    }

    public show(...arg) {

    }


}