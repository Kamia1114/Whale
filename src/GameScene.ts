/*
* 游戏主场景
*/
class GameScene{

    private _map: Laya.Component // 场景底
    private _sp: Laya.Particle2D;

    constructor(){
        this.init()
    }

    private init()
    {
        Laya.loader.load("particles/star.part", Laya.Handler.create(this, this.onAssetsLoaded), null, Laya.Loader.JSON);
    }

    public onAssetsLoaded(settings: Laya.ParticleSetting): void {
        let bgSp:Laya.Sprite = new Laya.Sprite;
        bgSp.pos(0,0);
        Laya.stage.addChild(bgSp);
        
        this._sp = new Laya.Particle2D(settings);
        this._sp.emitter.start();
        this._sp.play();
        bgSp.addChild(this._sp);
        this._sp.x = bgSp.width / 2;
        this._sp.y = bgSp.height / 2;
        let sp = this._sp;
    }

    public start()
    {
        let txt :Laya.Label = new Laya.Label();
        txt.color = "#FFFFFF";
        txt.fontSize = 34;
        txt.x = Laya.stage.width / 2;
        txt.y = Laya.stage.height / 2;
        txt.text = "点击任意 开始游戏"
        Laya.stage.on(Laya.Event.CLICK, this, this.GameStart);
    }

    private GameStart()
    {
        //开始游戏的主循环
        Laya.timer.loop(1000, this, this.onLoop );
    }

    private onLoop()
    {
        
    }
}