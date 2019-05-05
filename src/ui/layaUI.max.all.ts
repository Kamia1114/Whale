import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.gui {
    export class GameSceneUI extends Laya.View {
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadScene("gui/GameScene");
        }
    }
}
module ui.gui {
    export class GuiMaskUI extends Laya.View {
		public spMask:Laya.Sprite;
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadScene("gui/GuiMask");
        }
    }
}