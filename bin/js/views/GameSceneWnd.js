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
/**
* name
*/
var UI;
(function (UI) {
    /**
     * 游戏主场景
     * 这里添加 whale 活动层
     */
    var GameSceneWnd = /** @class */ (function (_super) {
        __extends(GameSceneWnd, _super);
        function GameSceneWnd() {
            var _this = _super.call(this) || this;
            //下边放本地自测数据
            _this.__iData = { skin: "0", followId: 0, attendant: [], isSelf: true, kId: 1, point: new Laya.Point(0, 0), angle: 0, inertia: 10, speed: 0 };
            _this._startApp();
            return _this;
        }
        GameSceneWnd.prototype._startApp = function () {
            //new自己
            // this._iself = new whaleUnit(this.__iData);
            // let img = new Laya.Image("whale/whale.png");
            // this.addChild(img);
            client.loginStep = EnumLoginType.Enter_COMPLETED;
        };
        return GameSceneWnd;
    }(ui.gui.GameSceneUI));
    UI.GameSceneWnd = GameSceneWnd;
})(UI || (UI = {}));
//# sourceMappingURL=GameSceneWnd.js.map