/*
* 游戏主场景
*/
var GameScene = /** @class */ (function () {
    function GameScene() {
        this.init();
    }
    GameScene.prototype.init = function () {
        Laya.loader.load("particles/star.part", Laya.Handler.create(this, this.onAssetsLoaded), null, Laya.Loader.JSON);
    };
    GameScene.prototype.onAssetsLoaded = function (settings) {
        var bgSp = new Laya.Sprite;
        bgSp.pos(0, 0);
        Laya.stage.addChild(bgSp);
        this._sp = new Laya.Particle2D(settings);
        this._sp.emitter.start();
        this._sp.play();
        bgSp.addChild(this._sp);
        this._sp.x = bgSp.width / 2;
        this._sp.y = bgSp.height / 2;
        var sp = this._sp;
    };
    GameScene.prototype.start = function () {
        var txt = new Laya.Label();
        txt.color = "#FFFFFF";
        txt.fontSize = 34;
        txt.x = Laya.stage.width / 2;
        txt.y = Laya.stage.height / 2;
        txt.text = "点击任意 开始游戏";
        Laya.stage.on(Laya.Event.CLICK, this, this.GameStart);
    };
    GameScene.prototype.GameStart = function () {
        //开始游戏的主循环
        Laya.timer.loop(1000, this, this.onLoop);
    };
    GameScene.prototype.onLoop = function () {
    };
    return GameScene;
}());
//# sourceMappingURL=GameScene.js.map