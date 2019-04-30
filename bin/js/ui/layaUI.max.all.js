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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var gui;
    (function (gui) {
        var GameSceneUI = /** @class */ (function (_super) {
            __extends(GameSceneUI, _super);
            function GameSceneUI() {
                return _super.call(this) || this;
            }
            GameSceneUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.gui.GameSceneUI.uiView);
            };
            GameSceneUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "compId": 1, "child": [{ "type": "Panel", "props": { "top": 0, "right": 0, "left": 0, "bottom": 0 }, "compId": 3 }], "loadList": [], "loadList3D": [] };
            return GameSceneUI;
        }(View));
        gui.GameSceneUI = GameSceneUI;
    })(gui = ui.gui || (ui.gui = {}));
})(ui || (ui = {}));
(function (ui) {
    var gui;
    (function (gui) {
        var GuiMaskUI = /** @class */ (function (_super) {
            __extends(GuiMaskUI, _super);
            function GuiMaskUI() {
                return _super.call(this) || this;
            }
            GuiMaskUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.gui.GuiMaskUI.uiView);
            };
            GuiMaskUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "mouseThrough": false, "left": 0, "height": 1334, "bottom": 0 }, "compId": 1, "child": [{ "type": "Sprite", "props": { "var": "spMask", "alpha": 0.5 }, "compId": 2 }], "loadList": [], "loadList3D": [] };
            return GuiMaskUI;
        }(View));
        gui.GuiMaskUI = GuiMaskUI;
    })(gui = ui.gui || (ui.gui = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map