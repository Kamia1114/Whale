var ResMgr = /** @class */ (function () {
    function ResMgr() {
        this.loadingList = new HashMap();
        this.genLoadID = 0;
        this._bIsLoading = false;
    }
    ResMgr.prototype.startLoading = function () {
        this.loadPermanentResource();
    };
    /**
     *  加载常驻内存图片资源
     */
    ResMgr.prototype.loadPermanentResource = function () {
        var _this = this;
        var urls = [
            { url: "res/atlas/icon.json", type: Laya.Loader.ATLAS },
            { url: "res/atlas/particle.json", type: Laya.Loader.ATLAS },
            { url: "res/atlas/whale.json", type: Laya.Loader.ATLAS },
        ];
        this._bIsLoading = true;
        this.addLoading(urls, Laya.Handler.create(this, function () {
            client.loginStep = EnumLoginType.Resource_COMPLETED;
            _this._bIsLoading = false;
        }));
    };
    ResMgr.prototype.addLoading = function (url, complete, progress, type, priority, cache, group, ignoreCache) {
        var loadID = 'L' + this.genLoadID++;
        if (url instanceof Array) {
            for (var index = 0; index < url.length; index++) {
                this.loadingList.set(loadID, [url.length, 0]);
            }
        }
        else {
            this.loadingList.set(loadID, [1, 0]);
        }
        return loaderMgr.load(url, Laya.Handler.create(this, this._loadComplete, [complete, loadID], false), Laya.Handler.create(this, this._loading, [progress, loadID], false), type, priority, cache, group, ignoreCache);
    };
    ResMgr.prototype._loadComplete = function (cb, loadID, finish) {
        var list = this.loadingList.get(loadID);
        list[1] = 1;
        this.loadingList.set(loadID, list);
        if (cb)
            cb.runWith(finish);
    };
    ResMgr.prototype._loading = function (cb, loadID, v) {
        var list = this.loadingList.get(loadID);
        list[1] = v;
        this.loadingList.set(loadID, list);
        if (cb)
            cb.runWith(v);
    };
    // 获取一个序列帧动画的帧数
    ResMgr.prototype.getAnimationSize = function (animation) {
        var aniM = Laya.Animation.framesMap[animation];
        if (aniM) {
            return aniM.length;
        }
        return 0;
    };
    //增加某个资源的引用
    ResMgr.prototype.addReference = function (panelNo, url) {
        var refCount;
        this.referenceMap || (this.referenceMap = new Object);
        if (!this.referenceMap[url]) {
            this.referenceMap[url] = 1;
            refCount = 1;
        }
        else {
            ++this.referenceMap[url];
            refCount = this.referenceMap[url];
        }
    };
    //移除某个资源的引用
    ResMgr.prototype.removeReference = function (panelNo, url) {
        var refCount;
        if (this.referenceMap) {
            --this.referenceMap[url];
            refCount = this.referenceMap[url];
        }
        else {
            refCount = -100;
        }
    };
    return ResMgr;
}());
var HashMap = /** @class */ (function () {
    function HashMap(_data) {
        this._data = {};
        if (_data) {
            this._data = _data;
        }
    }
    HashMap.prototype.get = function (key) {
        return this._data[key];
    };
    HashMap.prototype.add = function (key, v) {
        if (!this._data[key]) {
            this._data[key] = [];
        }
        this._data[key].push(v);
    };
    HashMap.prototype.set = function (key, v) {
        this._data[key] = v;
    };
    Object.defineProperty(HashMap.prototype, "keys", {
        get: function () {
            return Object.keys(this._data);
        },
        enumerable: true,
        configurable: true
    });
    HashMap.prototype.del = function (key) {
        delete this._data[key];
    };
    HashMap.prototype.clear = function () {
        this._data = {};
    };
    return HashMap;
}());
//# sourceMappingURL=ResMgr.js.map