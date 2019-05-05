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
            client.loginStep = EnumLoginType.Enter_COMPLETED; //没啥用，记录个步骤发个log
            _this.init();
            return _this;
        }
        GameSceneWnd.prototype.init = function () {
            this.initUI();
            this.initEvent();
        };
        GameSceneWnd.prototype.initUI = function () {
            //地图
            this._map = new Map();
            this._map.x = this._map.y = 0;
            this.addChild(this._map);
            //new自己
            this._iself = new whaleUnit(this.__iData);
            //把元素给控制器
            this._mCtl = new MovementControl(this._map, this._iself);
            var txt = new Laya.Label();
            txt.color = "#FFFFFF";
            txt.fontSize = 34;
            txt.x = Laya.stage.width / 2;
            txt.y = Laya.stage.height / 2;
            txt.anchorX = 0.5;
            txt.text = "点击任意 开始游戏";
            gUIMgr.addToLayer(txt, EnumLayerName.Top);
        };
        GameSceneWnd.prototype.initEvent = function () {
            //点了代码启动
            Laya.stage.once(Laya.Event.MOUSE_DOWN, this, this.start);
        };
        //游戏开始时注册一些主循环update
        GameSceneWnd.prototype.start = function () {
            //控制器开始跑了
            this._mCtl.start();
            //这里UI把提示去掉
            gUIMgr.uiLayer.removeLayerByName(EnumLayerName.Top);
        };
        return GameSceneWnd;
    }(ui.gui.GameSceneUI));
    UI.GameSceneWnd = GameSceneWnd;
})(UI || (UI = {}));
//# sourceMappingURL=GameSceneWnd.js.map