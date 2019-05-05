var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var Layer = /** @class */ (function (_super) {
    __extends(Layer, _super);
    function Layer() {
        var _this = _super.call(this) || this;
        Laya.stage.on(Laya.Event.RESIZE, _this, _this._onResize);
        return _this;
    }
    Layer.prototype.init = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        for (var i = 0; arg && i < arg.length; i++) {
            var layerName = arg[i];
            var layer = new Layer();
            layer.width = Laya.stage.width;
            layer.height = Laya.stage.height;
            layer.mouseThrough = true;
            layer.name = layerName;
            this.addChild(layer);
        }
    };
    Layer.prototype.getLayer = function (layerName) {
        var arr = layerName.split(".");
        var layer = this.getChildByName(arr.shift());
        while (layer && arr.length > 0) {
            layer = layer.getChildByName(arr.shift());
        }
        return layer;
    };
    Layer.prototype.addToLayer = function (mc, layerName, index) {
        if (layerName === void 0) { layerName = ""; }
        if (index === void 0) { index = -1; }
        var layer = this.getChildByName(layerName);
        if (!layer)
            layer = this;
        index > 0 ? layer.addChildAt(mc, index) : layer.addChild(mc);
    };
    Layer.prototype.removeLayerByName = function (layerName) {
        var layer = this.getChildByName(layerName);
        layer.removeChildren();
    };
    Layer.prototype._onResize = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
    };
    return Layer;
}(Laya.Sprite));
//层级类型
var EnumLayerName = {
    Top: "top",
    Pop: "pop",
    GUI: "gui",
    Effect: "Effect",
    Scene: "scene",
    BgEffect: "bgEffect",
    Bg: "bg",
};
//# sourceMappingURL=Layer.js.map