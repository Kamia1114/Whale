import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.gui {
    export class GameSceneUI extends View {
        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"compId":1,"child":[{"type":"Panel","props":{"top":0,"right":0,"left":0,"bottom":0},"compId":3}],"loadList":[],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gui.GameSceneUI.uiView);
        }
    }
}
module ui.gui {
    export class GuiMaskUI extends View {
		public spMask:Laya.Sprite;
        public static  uiView:any ={"type":"View","props":{"width":750,"top":0,"right":0,"mouseThrough":false,"left":0,"height":1334,"bottom":0},"compId":1,"child":[{"type":"Sprite","props":{"var":"spMask","alpha":0.5},"compId":2}],"loadList":[],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gui.GuiMaskUI.uiView);
        }
    }
}