/*
* name;
*/
class whaleUnit extends baseUnit{

    protected _data:SeWhaleUnitType;

    public _body:Laya.Image;
    private _isSelf:boolean;

    constructor(data:SeWhaleUnitType){
        super(data);
    }

    protected _init()
    {
        this._body = new Laya.Image(`whale/whale${this._data.skin}.png`);
        this.addChild(this._body);
        // this._body.width = 30;
        // this._body.height = 52;
        this._body.anchorX = 0.5;
        this._body.anchorY = 0.5;
        this._body.x = Laya.stage.width / 2;
        this._body.y = Laya.stage.height / 2;
    }

    protected _update(info:any)
    {
        for (var key in info){
            this._data[key] = info[key];
        }
    }

    public get uPoint():Laya.Point {
        return this._data.point;
    }
}