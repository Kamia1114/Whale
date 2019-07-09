/**
* name 
*/
module UI {
	/**
	 * 游戏主场景
     * 这里添加 whale 活动层
	 */
	export class GameSceneWnd extends ui.GameSceneUI {

        //运动控制
        private _mCtl: MovementControl;
        //所有单位丢这里
        private _map: Map;
        //自己
        private _iself: whaleUnit;
        //需要准备这四条信息
        private readonly INFO_NUM: number = 0;
        //
        private _curInfoNum: number = 0;
        //下边放本地自测数据
        // private __iData: WhaleUnitInfo = {skin:"0", followId:0, attendant:[], kID:1, x:3800, y:0, angle:0, speed:false, mapId:1}
        private _unitList:HashMap<whaleUnit>;

        constructor() { 
            super();
            this._init();
        }

        private _init()
        {
            this._initUI();
            this._initEvent();
            this._initData();
        }

        private _initUI() {
            //地图
            this._map = new Map();
            gUIMgr.addToLayer(this._map, EnumLayerName.Scene);

            //开始提示
            let txt :Laya.Label = new Laya.Label();
            txt.color = "#FFFFFF";
            txt.fontSize = 34;
            txt.anchorX = txt.anchorY = 0.5;
            txt.x = Define.stageWidth / 2 - txt.width/2;
            txt.y = Define.stageHeight / 2;
            txt.anchorX = 0.5;
            txt.text = "点击任意 开始游戏";
            gUIMgr.addToLayer(txt, EnumLayerName.Top);
        }

        private _initEvent() {
            // -wait
            gUIMgr.LayaStageOn(this, EVENT.MY_UNIT_INFO, this, this._selfUnitInfoComplete);
            gUIMgr.LayaStageOn(this, EVENT.UNIT_MOVE_INFO, this, this._updateUnit);

        }

        private _initData() {
            gNet.getSelfUnitInfo();
        }

        //个人信息收到了，通知进行下一步
        private _selfUnitInfoComplete() {
            //new自己
            this._iself = new whaleUnit(UnitInfoMgr.instance.selfInfo);
            this._unitList = new HashMap();
            this._unitList.set(this._iself.KID, this._iself);
            //把元素给控制器
            this._mCtl = new MovementControl(this._map, this._iself);
            
            client.loginStep = EnumLoginType.Enter_COMPLETED;
            //点击一下可以开始了
            Laya.stage.once(Laya.Event.CLICK, this, this._start);
        }

        //游戏开始时注册一些主循环update
        public _start(e:Laya.Event): void {
            e.stopPropagation();
            //这里UI把提示去掉
            gUIMgr.uiLayer.removeLayerByName(EnumLayerName.Top);
            //控制器开始跑了
            this._mCtl.start();
            this._addMouseEvent();
        }

        private _addMouseEvent() {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this._mouseHandler);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this._mouseHandler);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this._mouseHandler);
        }

        
        private _mouseHandler(e:Laya.Event)
        {
            switch(e.type) {
                case Laya.Event.MOUSE_DOWN:
                    this._move(e.stageX, e.stageY);
                    Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this._mouseHandler);
                    break;
                case Laya.Event.MOUSE_MOVE:
                    
                    break;
                case Laya.Event.MOUSE_UP:
                    Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this._mouseHandler);
                    break;
                case Laya.Event.MOUSE_OUT:
                    
                    break;
            }
        }
    
        /** 运动主逻辑 */
        private _move(x,y) {
            this._mCtl.readyMove(x, y);
        }

        private _updateUnit(ids:Array<number>) 
        {
            for(let i = 0; i < ids.length; i++) {
                this._mCtl.doMove(ids[i]);
            }
            
        }

    }
}