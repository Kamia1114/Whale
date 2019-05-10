/*
* name;
*/
class whaleUnit extends baseUnit{

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
        this._isSelf = this._data.kID == UnitDataMgr.instance.getSelfInfo().kID
    }
}