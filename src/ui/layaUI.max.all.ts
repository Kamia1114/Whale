import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.gui {
<<<<<<< HEAD
    export class GameSceneUI extends Laya.View {
=======
    export class GameSceneUI extends View {
        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"compId":1,"child":[{"type":"Panel","props":{"top":0,"right":0,"left":0,"bottom":0},"compId":3}],"loadList":[],"loadList3D":[]};
>>>>>>> f3882855fd199c7c55e8efd37b81a2c7e2dd0a58
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadScene("gui/GameScene");
        }
    }
}
module ui.gui {
    export class GuiMaskUI extends View {
		public spMask:Laya.Sprite;
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadScene("gui/GuiMask");
        }
    }
}