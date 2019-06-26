/*
* name;
*/
class baseUnit extends Laya.Sprite{

/****************************************************************** 以下基础属性 ******************************************************************/

    protected _data:WhaleUnitInfo;

    constructor(data:WhaleUnitInfo){
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

    //刷新同步显示跟逻辑坐标
    public refreshPoint()
    {
        this._data.x = this.x;
        this._data.y = this.y;
    }

    public get iPoint(): Laya.Point {
        return new Laya.Point(this._data.x, this._data.y);
    }
}

