/*
* name;
*/
class whaleUnit extends baseUnit{

    //数据跟显示做了分离，
    protected _data:WhaleUnitInfo;

    public _body:Laya.Image;
    private _isSelf:boolean;

    constructor(data:WhaleUnitInfo){
        super(data);
    }

    protected _init()
    {
        this._body = new Laya.Image(`whale/whale${this._data.skin}.png`);
        this.addChild(this._body);
        this._body.anchorX = 0.5;
        this._body.anchorY = 0.5;
        this._body.x = Laya.stage.width / 2;
        this._body.y = Laya.stage.height / 2;
        this._body.scale(0.5,0.5);
        // this._isSelf = this._data.kID == UnitDataMgr.instance.selfInfo.kID;
    }

    public get KID() :number
    {
        return this._data.kID;
    }

    public gotoPoint(p: Laya.Point)
    {
        Laya.Tween.to(this,{x:p.x, y:p.y},1000*Define.twConstVal )
    }
}