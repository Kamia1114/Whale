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
var View = Laya.View;
var Dialog = Laya.Dialog;
var Scene = Laya.Scene;
var ui;
(function (ui) {
    var GameSceneUI = /** @class */ (function (_super) {
        __extends(GameSceneUI, _super);
        function GameSceneUI() {
            return _super.call(this) || this;
        }
        GameSceneUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("GameScene");
        };
        return GameSceneUI;
    }(View));
    ui.GameSceneUI = GameSceneUI;
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
                this.loadScene("gui/GuiMask");
            };
            return GuiMaskUI;
        }(View));
        gui.GuiMaskUI = GuiMaskUI;
    })(gui = ui.gui || (ui.gui = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map