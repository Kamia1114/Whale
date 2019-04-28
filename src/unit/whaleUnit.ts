/*
* name;
*/
class whaleUnit extends baseUnit{

    protected _data:SeWhaleUnitType;

    private _body:Laya.Image;
    private _isSelf:boolean;

    constructor(data:SeWhaleUnitType){
        super(data);
    }

    protected _init()
    {
        this._body = new Laya.Image();
        this._body.skin = this._data.skin?`whale/whale${this._data.skin}.png`:"whale/whale.png";
        this.addChild(this._body);
        this._body.width = 61;
        this._body.height = 105;
    }

    protected _update(info:any)
    {
        for (var key in info){
            this._data[key] = info[key];
        }
    }
}