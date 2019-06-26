/*
* name;
*/
class baseUnit extends Laya.Sprite{

/****************************************************************** 以下基础属性 ******************************************************************/

    protected _data:UnitBaseInfo;

    constructor(data:UnitBaseInfo){
        super();
        this._data = data;
        this._init()
    }

    protected _init()
    {
        //创建时初始化固定属性
        
    }

    protected _update(info:any)
    {
        
    }

    public get iPoint(): Laya.Point {
        return new Laya.Point(this._data.x, this._data.y);
    }
}

