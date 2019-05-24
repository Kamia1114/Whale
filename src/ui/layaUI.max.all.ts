import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
module ui {
    export class GameSceneUI extends View {
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadScene("GameScene");
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