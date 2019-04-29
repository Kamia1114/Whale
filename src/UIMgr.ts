class UIMgr {
    m_kUIEventMgr: any;
    uiLayer: Layer;
    m_wndBaseHash: Array<UIBase>;               //创建器
    m_wndOpenHash: Array<WT> = [];              //当前打开的窗口记录
    m_eventLock: Object;

    private _mask: ui.gui.GuiMaskUI;

    constructor() {
        this.uiLayer = new Layer();
        this.uiLayer.init(EnumLayerName.Bg, EnumLayerName.BgEffect, EnumLayerName.Scene, EnumLayerName.Effect, EnumLayerName.GUI, EnumLayerName.Pop, EnumLayerName.Top);
        Laya.stage.addChild(this.uiLayer);
        this.registerAllWnd();
    }

    private registerAllWnd()
    {
        
    }

    private registerWnd(name: WT, wndType: any, layerName:string) {
        this.m_wndBaseHash[name] = new UIBase(name, wndType, layerName);
    }

    public addToLayer(mc: Laya.Node, layerName: string = "", index: number = -1) {
        this.uiLayer.addToLayer(mc, layerName, index);
    }

    public openWnd(...arg): any {
        var name: WT = arg.shift();
        var uiBasae = this.m_wndBaseHash[name];
        if (!uiBasae) {
            console.log('找不到对应的窗口类:' + name);
            return;
        }
        return uiBasae.open(...arg);
    }

    public closeWnd(name: WT): void {
        var uiBasae = this.m_wndBaseHash[name];
        if (uiBasae != undefined) {
            uiBasae.close();
        }
    }

    public closeAllPopView(layers: Array<any>) {
        var closeArr = [];
        for (var i = 0; i < gUIMgr.m_wndOpenHash.length; i++) {
            var uibase: UIBase = gUIMgr.m_wndBaseHash[gUIMgr.m_wndOpenHash[i]];
            if (uibase && layers.indexOf(uibase.layer) >= 0) {
                closeArr.push(gUIMgr.m_wndBaseHash[i]);
            }
        }
        for (var i = 0; i < closeArr.length; i++) {
            gUIMgr.closeWnd(closeArr[i]);
        }
    }

    public LayaStageEvent(type: string, data?: any): boolean {
        if (this.m_eventLock[type] > 0) return false;
        return Laya.stage.event(type, data);
    }

    public LayaStageOn(uicaller: any, type: string, caller: any, listener: Function, args?: Array<any>): laya.events.EventDispatcher {
        var callType = this.getCallType(uicaller);
        if (callType) {
            if (!this.m_kUIEventMgr.hasOwnProperty(callType)) {
                this.m_kUIEventMgr[callType] = [];
            }

            this.m_kUIEventMgr[callType].push(new UIEventUnit(type, caller, listener, args));
        }
        return Laya.stage.on(type, caller, listener, args);
    }

    public LayaStageOnce(uicaller: any, type: string, caller: any, listener: Function, args?: Array<any>): laya.events.EventDispatcher {
        var callType = this.getCallType(uicaller);

        if (callType) {
            if (!this.m_kUIEventMgr.hasOwnProperty(callType)) {
                this.m_kUIEventMgr[callType] = [];
            }

            this.m_kUIEventMgr[callType].push(new UIEventUnit(type, caller, listener, args));
        }
        return Laya.stage.once(type, caller, listener, args);
    }

    //移除某个UI上的所有监听
    public LayaStageOffAll(uicaller: any): void {
        var callType = this.getCallType(uicaller);
        if (callType) {
            if (this.m_kUIEventMgr[callType]) {
                for (var i = this.m_kUIEventMgr[callType].length - 1; i >= 0; i--) {
                    var uiEvent: UIEventUnit = this.m_kUIEventMgr[callType][i];
                    this.m_kUIEventMgr[callType].splice(i, 1);
                    Laya.stage.off(uiEvent.type, uiEvent.caller, uiEvent.listener);
                    uiEvent.clear();
                }
            }
        }
    }

    private _callType: number = 0;
    public getCallType(uicaller: any) {
        if (!uicaller) return 0;
        if (!uicaller["$callType"]) {
            uicaller["$callType"] = (++this._callType);
        }
        return uicaller["$callType"];
    }

    public get topPopWnd(): WT {
        for (var i = this.m_wndOpenHash.length - 1; i >= 0; i--) {
            var wnd = this.getWnd(this.m_wndOpenHash[i]);
            if (this.m_wndBaseHash[this.m_wndOpenHash[i]].layer == EnumLayerName.Pop && wnd && wnd.visible) {
                return this.m_wndOpenHash[i];
            }
        }
        return -1;
    }

    public getWnd(name: WT): any {
        return this.m_wndBaseHash[name] && this.m_wndBaseHash[name].wnd;
    }

    public checkMask() {
        let tpWt: WT = this.topPopWnd;
        var topWnd = this.getWnd(tpWt);
        if (topWnd && topWnd.parent) {
            if (!this._mask) {
                this._mask = new ui.gui.GuiMaskUI();
            }
            this._mask.removeSelf();
            if (this._mask.spMask) {
                this._mask.spMask.graphics.clear();
                this._mask.spMask.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000");
            }
            let par: Laya.Sprite = topWnd.parent;
            par.addChildAt(this._mask, par.getChildIndex(topWnd));
            this._mask.off(Laya.Event.CLICK, this, this.clickToClosePopWnd);
            this._mask.on(Laya.Event.CLICK, this, this.clickToClosePopWnd);

        } else {
            this._mask && this._mask.removeSelf();
        }
    }

    private clickToClosePopWnd(): void {
        let tpWt = this.topPopWnd;
        let wnd = this.getWnd(tpWt)
        if (wnd) {
            this.closeWnd(tpWt);
        }
    }
}

class UIBase {
    private _cls: any;
    private _wndName: WT;
    private _layerName: string;
    private _appItem: any;
    private _state: WndState = WndState.Close;
    private _templeteResList: Array<{ url: string, type: string }>;
    private _visible: boolean = false;

    constructor(wndName: WT, cls: any, layerName: string) {
        this._wndName = wndName;
        this._cls = cls;
        this._layerName = layerName;
    }

    public get wndType(): any {
        return this._cls;
    }

    public get WTType(): any {
        return this._wndName;
    }

    public get wnd(): any {
        return this._appItem;
    }

    public get layer(): string {
        return this._layerName;
    }

    public open(...arg) {
        if (this._state != WndState.Close) {
            console.log("界面已打开" + this._wndName);
            return;
        }
        gUIMgr.m_wndOpenHash.push(this._wndName);
        this._visible = true;
        this._state = WndState.ResLoading;
        this._show(...arg);
    }

    protected _show(...arg) {

        //第2个参数作为它的父节点
        var parent = null;
        if (arg[0] != null && arg[0] instanceof Laya.Component) {
            parent = <Laya.Component>arg[0];
            arg.splice(0, 1);
        }

        var wndType: any = this._cls;
        console.log('打开窗口：' + wndType.name);
        var newWnd = new wndType(...arg);
        gUIMgr.addToLayer(newWnd, this._layerName);

        newWnd['_auto_'] && newWnd['_auto_'](this._wndName);
        this._appItem = newWnd;
        this._appItem["$wndName"] = this._wndName;
        this._appItem["$uiBase"] = this;
        this._appItem.visible = this._visible;

        gUIMgr.m_wndOpenHash.push(this._wndName);
        this.playWndAni();
        if (newWnd.bgMask) {
            newWnd.bgMask.mouseEnabled = true;
            newWnd.bgMask.on(Laya.Event.CLICK, this, this.close);
        }
        this._state = WndState.Open;
        switch (this.layer) {
            case EnumLayerName.Pop:
            case EnumLayerName.Top:
                //只有弹出窗口需要checkMask
                gUIMgr.checkMask();
                break;
            default:
                break;
        }
        gUIMgr.LayaStageEvent("wndOpen", [this._wndName]);
    }

    public close() {
        var findIdx = gUIMgr.m_wndOpenHash.indexOf(this._wndName);
        if (findIdx >= 0) {
            gUIMgr.m_wndOpenHash.splice(findIdx, 1);
        }
        this._visible = false;
        this._state = WndState.Close;
        if (this._appItem != undefined) {
            console.log("关闭窗口:", this._cls.name);
            var rkUI = this._appItem;
            Laya.timer.clearAll(rkUI);
            Laya.stage.focus = rkUI.parent || Laya.stage.focus;
            this._destroy(rkUI);
            this._appItem["$uiBase"] = null;
            this._appItem = null;
            gUIMgr.LayaStageEvent("wndClose", [this._wndName]);
        }
    }

    protected _destroy(rkUI) {
        if (rkUI.destroyed) {
            return;
        }
        //移除这个ui上的所有监听
        gUIMgr.LayaStageOffAll(rkUI);
        rkUI.destroy();
        switch (this.layer) {
            case EnumLayerName.Pop:
            case EnumLayerName.Top:
                //只有弹出窗口需要checkMask
                gUIMgr.checkMask();
                break;
            default:
                break;
        }
    }

    public playWndAni() {
        if (this._appItem) {
            this._appItem.scale(0.98, 0.98);
            if (this._appItem.anchorX != 0.5) {
                this._appItem.anchorX = this._appItem.anchorY = 0.5
                this._appItem.x += this._appItem.width * 0.5
                this._appItem.y += this._appItem.height * 0.5
            }
            Laya.Tween.to(this._appItem, { scaleX: 1.02, scaleY: 1.02 }, 2 * Define.FrameTime, Laya.Ease.linearNone);
            Laya.Tween.to(this._appItem, { scaleX: 1, scaleY: 1 }, 2 * Define.FrameTime, Laya.Ease.linearNone, null, 2 * Define.FrameTime);
        }
    }
}

/**
 * UIEventUnit
 */
class UIEventUnit {
    constructor(type: string, caller: any, listener: Function, args?: Array<any>) {
        this.type = type;
        this.caller = caller;
        this.listener = listener;
        this.arg = args;
    }

    public clear() {
        this.type = null;
        this.caller = null;
        this.listener = null;
        this.arg = null;
    }

    listener: any;
    caller: any;
    type: any;
    arg: any;
}

enum WndState {
    Close,
    Open,
    ResLoading,
}