
/**
* name 
*/
module UI {
	/**
	 * 游戏主场景
     * 这里添加 whale 活动层
	 */
	export class GameSceneWnd extends ui.gui.GameSceneUI {

        //运动控制
        private _mCtl: MovementControl;
        //所有单位丢这里
        private _map: Map;
        //自己
        private _iself: whaleUnit;
        //鲸鱼数据池
        private _roleList: HashMap<whaleUnit>;

        //下边放本地自测数据
        private __iData: SeWhaleUnitType = {skin:"0", followId:0, attendant:[], isSelf:true, kId:1, point: new Laya.Point(0, 0), angle:0, inertia:10, speed:0}

        constructor() { 
            super();
            client.loginStep = EnumLoginType.Enter_COMPLETED;//没啥用，记录个步骤发个log
            this.init();
        }

        private init()
        {
            this.initUI();
            // this.initEvent();
            //点了代码启动
            Laya.stage.once(Laya.Event.MOUSE_DOWN, this, this.start);
        }

        private initUI() {
            //地图
            this._map = new Map();
            this._map.x = this._map.y = 0;
            this.addChild(this._map);
            //new自己
            this._iself = new whaleUnit(this.__iData);
            //把元素给控制器
            this._mCtl = new MovementControl(this._map, this._iself);
            //开始提示
            let txt :Laya.Label = new Laya.Label();
            txt.color = "#FFFFFF";
            txt.fontSize = 34;
            txt.anchorX = txt.anchorY = 0.5;
            txt.x = Laya.stage.width / 2 - txt.width/2;
            txt.y = Laya.stage.height / 2;
            txt.anchorX = 0.5;
            txt.text = "点击任意 开始游戏";
            gUIMgr.addToLayer(txt, EnumLayerName.Top);
        }

        //游戏开始时注册一些主循环update
        public start(): void {
            //这里UI把提示去掉
            gUIMgr.uiLayer.removeLayerByName(EnumLayerName.Top);
            //控制器开始跑了
            this._mCtl.start();
            this.initEvent();
        }

        private initEvent()
        {
            this.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
            this.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseHandler);
            this.stage.on(Laya.Event.MOUSE_UP, this, this.mouseHandler);
            this.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseHandler);
        }

        private mouseHandler(e:Laya.Event)
        {
            switch(e.type) {
                case Laya.Event.MOUSE_DOWN:

                    break;
                case Laya.Event.MOUSE_MOVE:
                    
                    break;
                case Laya.Event.MOUSE_UP:
                    
                    break;
                case Laya.Event.MOUSE_OUT:
                    
                    break;
            }
        }
    }
}