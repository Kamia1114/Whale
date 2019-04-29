var UIMgr = /** @class */ (function () {
    function UIMgr() {
        this.m_wndOpenHash = []; //当前打开的窗口记录
        this._callType = 0;
        this.m_kUIEventMgr = {};
        this.m_eventLock = {};
        this.m_wndBaseHash = [];
        this.uiLayer = new Layer();
        this.uiLayer.init(EnumLayerName.Bg, EnumLayerName.BgEffect, EnumLayerName.Scene, EnumLayerName.Effect, EnumLayerName.GUI, EnumLayerName.Pop, EnumLayerName.Top);
        Laya.stage.addChild(this.uiLayer);
        this.registerAllWnd();
    }
    UIMgr.prototype.registerAllWnd = function () {
        this.registerWnd(WT.GAMESCENE_WND, UI.GameSceneWnd, EnumLayerName.Scene);
    };
    UIMgr.prototype.registerWnd = function (name, wndType, layerName) {
        this.m_wndBaseHash[name] = new UIBase(name, wndType, layerName);
    };
    UIMgr.prototype.addToLayer = function (mc, layerName, index) {
        if (layerName === void 0) { layerName = ""; }
        if (index === void 0) { index = -1; }
        this.uiLayer.addToLayer(mc, layerName, index);
    };
    UIMgr.prototype.openWnd = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var name = arg.shift();
        var uiBasae = this.m_wndBaseHash[name];
        if (!uiBasae) {
            console.log('找不到对应的窗口类:' + name);
            return;
        }
        return uiBasae.open.apply(uiBasae, arg);
    };
    UIMgr.prototype.closeWnd = function (name) {
        var uiBasae = this.m_wndBaseHash[name];
        if (uiBasae != undefined) {
            uiBasae.close();
        }
    };
    UIMgr.prototype.closeAllPopView = function (layers) {
        var closeArr = [];
        for (var i = 0; i < gUIMgr.m_wndOpenHash.length; i++) {
            var uibase = gUIMgr.m_wndBaseHash[gUIMgr.m_wndOpenHash[i]];
            if (uibase && layers.indexOf(uibase.layer) >= 0) {
                closeArr.push(gUIMgr.m_wndBaseHash[i]);
            }
        }
        for (var i = 0; i < closeArr.length; i++) {
            gUIMgr.closeWnd(closeArr[i]);
        }
    };
    UIMgr.prototype.LayaStageEvent = function (type, data) {
        if (this.m_eventLock[type] > 0)
            return false;
        return Laya.stage.event(type, data);
    };
    UIMgr.prototype.LayaStageOn = function (uicaller, type, caller, listener, args) {
        var callType = this.getCallType(uicaller);
        if (callType) {
            if (!this.m_kUIEventMgr.hasOwnProperty(callType)) {
                this.m_kUIEventMgr[callType] = [];
            }
            this.m_kUIEventMgr[callType].push(new UIEventUnit(type, caller, listener, args));
        }
        return Laya.stage.on(type, caller, listener, args);
    };
    UIMgr.prototype.LayaStageOnce = function (uicaller, type, caller, listener, args) {
        var callType = this.getCallType(uicaller);
        if (callType) {
            if (!this.m_kUIEventMgr.hasOwnProperty(callType)) {
                this.m_kUIEventMgr[callType] = [];
            }
            this.m_kUIEventMgr[callType].push(new UIEventUnit(type, caller, listener, args));
        }
        return Laya.stage.once(type, caller, listener, args);
    };
    //移除某个UI上的所有监听
    UIMgr.prototype.LayaStageOffAll = function (uicaller) {
        var callType = this.getCallType(uicaller);
        if (callType) {
            if (this.m_kUIEventMgr[callType]) {
                for (var i = this.m_kUIEventMgr[callType].length - 1; i >= 0; i--) {
                    var uiEvent = this.m_kUIEventMgr[callType][i];
                    this.m_kUIEventMgr[callType].splice(i, 1);
                    Laya.stage.off(uiEvent.type, uiEvent.caller, uiEvent.listener);
                    uiEvent.clear();
                }
            }
        }
    };
    UIMgr.prototype.getCallType = function (uicaller) {
        if (!uicaller)
            return 0;
        if (!uicaller["$callType"]) {
            uicaller["$callType"] = (++this._callType);
        }
        return uicaller["$callType"];
    };
    Object.defineProperty(UIMgr.prototype, "topPopWnd", {
        get: function () {
            for (var i = this.m_wndOpenHash.length - 1; i >= 0; i--) {
                var wnd = this.getWnd(this.m_wndOpenHash[i]);
                if (this.m_wndBaseHash[this.m_wndOpenHash[i]].layer == EnumLayerName.Pop && wnd && wnd.visible) {
                    return this.m_wndOpenHash[i];
                }
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    UIMgr.prototype.getWnd = function (name) {
        return this.m_wndBaseHash[name] && this.m_wndBaseHash[name].wnd;
    };
    UIMgr.prototype.checkMask = function () {
        var tpWt = this.topPopWnd;
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
            var par = topWnd.parent;
            par.addChildAt(this._mask, par.getChildIndex(topWnd));
            this._mask.off(Laya.Event.CLICK, this, this.clickToClosePopWnd);
            this._mask.on(Laya.Event.CLICK, this, this.clickToClosePopWnd);
        }
        else {
            this._mask && this._mask.removeSelf();
        }
    };
    UIMgr.prototype.clickToClosePopWnd = function () {
        var tpWt = this.topPopWnd;
        var wnd = this.getWnd(tpWt);
        if (wnd) {
            this.closeWnd(tpWt);
        }
    };
    return UIMgr;
}());
var UIBase = /** @class */ (function () {
    function UIBase(wndName, cls, layerName) {
        this._state = WndState.Close;
        this._visible = false;
        this._wndName = wndName;
        this._cls = cls;
        this._layerName = layerName;
    }
    Object.defineProperty(UIBase.prototype, "wndType", {
        get: function () {
            return this._cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIBase.prototype, "WTType", {
        get: function () {
            return this._wndName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIBase.prototype, "wnd", {
        get: function () {
            return this._appItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIBase.prototype, "layer", {
        get: function () {
            return this._layerName;
        },
        enumerable: true,
        configurable: true
    });
    UIBase.prototype.open = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this._state != WndState.Close) {
            console.log("界面已打开" + this._wndName);
            return;
        }
        gUIMgr.m_wndOpenHash.push(this._wndName);
        this._visible = true;
        this._state = WndState.ResLoading;
        this._show.apply(this, arg);
    };
    UIBase.prototype._show = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        //第2个参数作为它的父节点
        var parent = null;
        if (arg[0] != null && arg[0] instanceof Laya.Component) {
            parent = arg[0];
            arg.splice(0, 1);
        }
        var wndType = this._cls;
        console.log('打开窗口：' + wndType.name);
        var newWnd = new (wndType.bind.apply(wndType, [void 0].concat(arg)))();
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
    };
    UIBase.prototype.close = function () {
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
    };
    UIBase.prototype._destroy = function (rkUI) {
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
    };
    UIBase.prototype.playWndAni = function () {
        if (this._appItem) {
            this._appItem.scale(0.98, 0.98);
            if (this._appItem.anchorX != 0.5) {
                this._appItem.anchorX = this._appItem.anchorY = 0.5;
                this._appItem.x += this._appItem.width * 0.5;
                this._appItem.y += this._appItem.height * 0.5;
            }
            Laya.Tween.to(this._appItem, { scaleX: 1.02, scaleY: 1.02 }, 2 * Define.FrameTime, Laya.Ease.linearNone);
            Laya.Tween.to(this._appItem, { scaleX: 1, scaleY: 1 }, 2 * Define.FrameTime, Laya.Ease.linearNone, null, 2 * Define.FrameTime);
        }
    };
    return UIBase;
}());
/**
 * UIEventUnit
 */
var UIEventUnit = /** @class */ (function () {
    function UIEventUnit(type, caller, listener, args) {
        this.type = type;
        this.caller = caller;
        this.listener = listener;
        this.arg = args;
    }
    UIEventUnit.prototype.clear = function () {
        this.type = null;
        this.caller = null;
        this.listener = null;
        this.arg = null;
    };
    return UIEventUnit;
}());
var WndState;
(function (WndState) {
    WndState[WndState["Close"] = 0] = "Close";
    WndState[WndState["Open"] = 1] = "Open";
    WndState[WndState["ResLoading"] = 2] = "ResLoading";
})(WndState || (WndState = {}));
//# sourceMappingURL=UIMgr.js.map