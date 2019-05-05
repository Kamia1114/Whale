/*
* name;
*/
class whaleUnit extends baseUnit{

    protected _data:SeWhaleUnitType;
    private _isChange:boolean;

    public _body:Laya.Image;
    private _isSelf:boolean;

    constructor(data:SeWhaleUnitType){
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
    }

    protected _update(info:any)
    {
        for (var key in info){
            if(!this._data[key] || this._data[key] != info[key]) {
                //数据变动了
                this._data[key] = info[key];
                this._isChange = true;
            }
        }
    }

    public set isChange(val:boolean)
    {
        this._isChange = val;
    }

    public get isChange():boolean
    {
        return this._isChange;
    }

    public get uPoint():Laya.Point {
        return this._data.point;
    }
}