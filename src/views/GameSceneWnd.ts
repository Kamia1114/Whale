
/**
* name 
*/
module UI {
	/**
	 * 游戏主场景
     * 这里添加 whale 活动层
	 */
	export class GameSceneWnd extends ui.GameSceneUI {

        private _map: Laya.Sprite;
        private _iself: whaleUnit;

        //下边放本地自测数据
        private __iData: SeWhaleUnitType = {skin:"0", followId:0, attendant:[], isSelf:true, kId:1, point: new Laya.Point(0, 0), angle:0, inertia:10, speed:0}

        constructor() { 
            super();
            this._startApp();
        }
        
        private _startApp() {
            this._iself = new whaleUnit(this.__iData);
        }
    }
}