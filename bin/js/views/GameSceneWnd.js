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
            //需要准备这四条信息
            _this.INFO_NUM = 0;
            //
            _this._curInfoNum = 0;
            //下边放本地自测数据
            _this.__iData = { skin: "0", followId: 0, attendant: [], isSelf: true, kID: 1, point: new Laya.Point(3800, 0), angle: 0, inertia: 10, speed: 0, mapId: 1 };
            client.loginStep = EnumLoginType.Enter_COMPLETED; //这个发完跑计时器了
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
            gUIMgr.addToLayer(this._map, EnumLayerName.Scene);
            //new自己
            this._iself = new whaleUnit(this.__iData);
            //把元素给控制器
            this._mCtl = new MovementControl(this._map, this._iself);
        };
        GameSceneWnd.prototype.initEvent = function () {
            // -wait
            // gUIMgr.LayaStageOn(this, G_EVENT.GameInfo_Get, this, this._updateInfoState);
            this._updateInfoState();
        };
        GameSceneWnd.prototype._updateInfoState = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            console.log(arg[0]);
            this._curInfoNum++;
            if (this._curInfoNum >= this.INFO_NUM) {
                console.log("all ready!", this._curInfoNum);
                //开始提示
                var txt = new Laya.Label();
                txt.color = "#FFFFFF";
                txt.fontSize = 34;
                txt.anchorX = txt.anchorY = 0.5;
                txt.x = Define.stageWidth / 2 - txt.width / 2;
                txt.y = Define.stageHeight / 2;
                txt.anchorX = 0.5;
                txt.text = "点击任意 开始游戏";
                gUIMgr.addToLayer(txt, EnumLayerName.Top);
                Laya.stage.once(Laya.Event.CLICK, this, this.start);
            }
        };
        //游戏开始时注册一些主循环update
        GameSceneWnd.prototype.start = function (e) {
            e.stopPropagation();
            //这里UI把提示去掉
            gUIMgr.uiLayer.removeLayerByName(EnumLayerName.Top);
            //控制器开始跑了
            this._mCtl.start();
        };
        return GameSceneWnd;
    }(ui.GameSceneUI));
    UI.GameSceneWnd = GameSceneWnd;
})(UI || (UI = {}));
//# sourceMappingURL=GameSceneWnd.js.map