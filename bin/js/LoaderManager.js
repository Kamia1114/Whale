var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LoaderManager = /** @class */ (function (_super) {
    __extends(LoaderManager, _super);
    function LoaderManager() {
        var _this = _super.call(this) || this;
        _this.retryNum = 2;
        _this.retryDelay = 0;
        _this.maxLoader = 0;
        _this._loaderCount = 0;
        _this._maxPriority = 5;
        _this._addReTry = function (resInfo) {
            var priority = Math.max(resInfo.priority - 1, 0);
            this._resInfos[priority].push(resInfo);
            this._next();
        };
        _this.retryNum = 1;
        _this.retryDelay = 0;
        _this.maxLoader = 5;
        _this._loaders = [];
        _this._loaderCount = 0;
        _this._resInfos = [];
        _this._infoPool = [];
        _this._maxPriority = 5;
        _this._failRes = {};
        for (var i = 0; i < _this._maxPriority; i++)
            _this._resInfos[i] = [];
        return _this;
    }
    /**
    *<p>根据clas类型创建一个未初始化资源的对象，随后进行异步加载，资源加载完成后，初始化对象的资源，并通过此对象派发 Event.LOADED 事件，事件回调参数值为此对象本身。套嵌资源的子资源会保留资源路径"?"后的部分。</p>
    *<p>如果url为数组，返回true；否则返回指定的资源类对象，可以通过侦听此对象的 Event.LOADED 事件来判断资源是否已经加载完毕。</p>
    *<p><b>注意：</b>cache参数只能对文件后缀为atlas的资源进行缓存控制，其他资源会忽略缓存，强制重新加载。</p>
    *@param url 资源地址或者数组。如果url和clas同时指定了资源类型，优先使用url指定的资源类型。参数形如：[{url:xx,clas:xx,priority:xx,params:xx},{url:xx,clas:xx,priority:xx,params:xx}]。
    *@param progress 资源加载进度回调，回调参数值为当前资源加载的进度信息(0-1)。
    *@param clas 资源类名。如果url和clas同时指定了资源类型，优先使用url指定的资源类型。参数形如：Texture。
    *@param type 资源类型。参数形如：Loader.IMAGE。
    *@param priority (default=1)加载的优先级，优先级高的优先加载。有0-4共5个优先级，0最高，4最低。
    *@param cache 是否缓存加载的资源。
    *@return 如果url为数组，返回true；否则返回指定的资源类对象。
    */
    LoaderManager.prototype.create = function (url, complete, progress, clas, params, priority, cache) {
        if (progress === void 0) { progress = null; }
        if (clas === void 0) { clas = null; }
        if (params === void 0) { params = null; }
        if (priority === void 0) { priority = 1; }
        if (cache === void 0) { cache = true; }
        (priority === void 0) && (priority = 1);
        (cache === void 0) && (cache = true);
        if ((url instanceof Array)) {
            var items = url;
            var itemCount = items.length;
            var loadedCount = 0;
            if (progress) {
                var progress2 = Laya.Handler.create(progress.caller, progress.method, progress.args, false);
            }
            for (var i = 0; i < itemCount; i++) {
                var item = items[i];
                if ((typeof item == 'string'))
                    item = items[i] = { url: item };
                item.progress = 0;
                var progressHandler = progress ? Laya.Handler.create(null, function (item, value) {
                    item.progress = value;
                    var num = 0;
                    for (var j = 0; j < itemCount; j++) {
                        var item1 = items[j];
                        num += item1.progress;
                    }
                    ;
                    var v = num / itemCount;
                }, [item], false) : null;
                var completeHandler = (progress || complete) ? Laya.Handler.create(null, function (item, content) {
                    loadedCount++;
                    item.progress = 1;
                    if (loadedCount === itemCount && complete) {
                        complete.run();
                    }
                }, [item]) : null;
                this._create(item.url, completeHandler, progressHandler, item.clas || clas, item.params || params, item.priority || priority, cache);
            }
            return true;
        }
        else
            return this._create(url, complete, progress, clas, params, priority, cache);
    };
    LoaderManager.prototype._create = function (url, complete, progress, clas, params, priority, cache) {
        (priority === void 0) && (priority = 1);
        (cache === void 0) && (cache = true);
        url = Laya.URL.formatURL(url);
        var item = this.getRes(url);
        if (!item) {
            var extension = Laya.Utils.getFileExtension(url);
            var creatItem = Laya.LoaderManager.createMap[extension];
            if (!clas)
                clas = creatItem[0];
            var type = creatItem[1];
            if (extension == "atlas") {
                this.load(url, complete, progress, type, priority, cache);
            }
            else {
                if (clas === Laya.Texture)
                    type = "htmlimage";
                item = clas ? new clas() : null;
                if (item.hasOwnProperty("_loaded"))
                    item._loaded = false;
                this.load(url, Laya.Handler.create(null, function (data) {
                    (item && !item.disposed) && (item.onAsynLoaded.call(item, url, data, params));
                    if (complete)
                        complete.run();
                    Laya.loader.event(url);
                }), progress, type, priority, false, null, true);
                if (cache) {
                    this.cacheRes(url, item);
                    item.url = url;
                }
            }
        }
        else {
            if (!item.hasOwnProperty("loaded") || item.loaded) {
                progress && progress.runWith(1);
                complete && complete.run();
            }
            else if (complete) {
                Laya.loader._createListener(url, complete.caller, complete.method, complete.args, true, false);
            }
        }
        return item;
    };
    /**
    *<p>加载资源。资源加载错误时，本对象会派发 Event.ERROR 事件，事件回调参数值为加载出错的资源地址。</p>
    *<p>因为返回值为 LoaderManager 对象本身，所以可以使用如下语法：Laya.loader.load(...).load(...);</p>
    *@param url 要加载的单个资源地址或资源信息数组。比如：简单数组：["a.png","b.png"]；复杂数组[{url:"a.png",type:Loader.IMAGE,size:100,priority:1},{url:"b.json",type:Loader.JSON,size:50,priority:1}]。
    *@param complete 加载结束回调。根据url类型不同分为2种情况：1. url为String类型，也就是单个资源地址，如果加载成功，则回调参数值为加载完成的资源，否则为null；2. url为数组类型，指定了一组要加载的资源，如果全部加载成功，则回调参数值为true，否则为false。
    *@param progress 加载进度回调。回调参数值为当前资源的加载进度信息(0-1)。
    *@param type 资源类型。比如：Loader.IMAGE。
    *@param priority (default=1)加载的优先级，优先级高的优先加载。有0-4共5个优先级，0最高，4最低。
    *@param cache 是否缓存加载结果。
    *@param group 分组，方便对资源进行管理。
    *@param ignoreCache 是否忽略缓存，强制重新加载。
    *@return 此 LoaderManager 对象本身。
    */
    LoaderManager.prototype.load = function (url, complete, progress, type, priority, cache, group, ignoreCache) {
        if (progress === void 0) { progress = null; }
        if (type === void 0) { type = null; }
        if (priority === void 0) { priority = 1; }
        if (cache === void 0) { cache = true; }
        (priority === void 0) && (priority = 1);
        (cache === void 0) && (cache = true);
        (ignoreCache === void 0) && (ignoreCache = false);
        if ((url instanceof Array))
            return this._loadAssets(url, complete, progress, type, priority, cache, group);
        var content = Laya.Loader.getRes(url);
        if (content != null) {
            if (type == Laya.Loader.ATLAS) {
                var info = LoaderManager._resMap[url];
                if (info) {
                    complete && info._createListener(/*laya.events.Event.COMPLETE*/ "complete", complete.caller, complete.method, complete.args, false, false);
                    progress && info._createListener(/*laya.events.Event.PROGRESS*/ "progress", progress.caller, progress.method, progress.args, false, false);
                    // this.event(/*laya.events.Event.PROGRESS*/"progress", 0.3 + completeNum / toloadPics.length * 0.6);
                    return this;
                }
            }
            progress && progress.runWith(1);
            complete && complete.runWith(content);
            this._loaderCount || this.event(/*laya.events.Event.COMPLETE*/ "complete");
        }
        else {
            var info = LoaderManager._resMap[url];
            priority = priority < this._maxPriority ? priority : this._maxPriority - 1;
            if (!info) {
                info = this._infoPool.length ? this._infoPool.pop() : new ResInfo();
                info.url = url;
                info.type = type;
                info.cache = cache;
                info.group = group;
                info.ignoreCache = ignoreCache;
                info.priority = priority;
                complete && info.on(/*laya.events.Event.COMPLETE*/ "complete", complete.caller, complete.method, complete.args);
                progress && info.on(/*laya.events.Event.PROGRESS*/ "progress", progress.caller, progress.method, progress.args);
                LoaderManager._resMap[url] = info;
                this._resInfos[priority].push(info);
                this._next();
            }
            else {
                if (priority < info.priority) {
                    var index = this._resInfos[info.priority] ? this._resInfos[info.priority].indexOf(info) : -1;
                    if (index > -1) {
                        this._resInfos[info.priority].splice(index, 1);
                    }
                    info.priority = priority;
                    this._resInfos[priority].push(info);
                }
                complete && info._createListener(/*laya.events.Event.COMPLETE*/ "complete", complete.caller, complete.method, complete.args, false, false);
                progress && info._createListener(/*laya.events.Event.PROGRESS*/ "progress", progress.caller, progress.method, progress.args, false, false);
            }
        }
        return this;
    };
    /**
     * 打印加载中的资源列表
     */
    LoaderManager.prototype.printLoadingResInfo = function () {
        console.log('------------------------------------------->');
        for (var i = 0; i < this._maxPriority; i++) {
            var infos = this._resInfos[i];
            for (var j = 0; j < infos.length; ++j) {
                console.log('---> url :' + infos[j].url + ', type:' + infos[j].type + ' <---');
            }
        }
        console.log('------------------------------------------->');
    };
    LoaderManager.prototype._next = function () {
        if (this._loaderCount >= this.maxLoader)
            return;
        for (var i = 0; i < this._maxPriority; i++) {
            var infos = this._resInfos[i];
            if (infos.length > 0) {
                var info = infos.shift();
                if (info)
                    return this._doLoad(info);
            }
        }
        this._loaderCount || this.event(/*laya.events.Event.COMPLETE*/ "complete");
    };
    LoaderManager.prototype._doLoad = function (resInfo) {
        this._loaderCount++;
        var loader = this._loaders.length ? this._loaders.pop() : new Laya.Loader();
        loader.on(/*laya.events.Event.COMPLETE*/ "complete", this, this.onLoaded, [resInfo, loader]);
        loader.on(/*laya.events.Event.PROGRESS*/ "progress", null, function (num) {
            resInfo.event(/*laya.events.Event.PROGRESS*/ "progress", num);
        });
        loader.on(/*laya.events.Event.ERROR*/ "error", this, this.onLoadError, [resInfo, loader]);
        loader.load(resInfo.url, resInfo.type, resInfo.cache, resInfo.group, resInfo.ignoreCache);
    };
    LoaderManager.prototype.onLoaded = function (resInfo, loader, data) {
        loader.offAll();
        loader._data = null;
        this._loaders.push(loader);
        this._endLoad(resInfo, (data instanceof Array) ? [data] : data);
        this._loaderCount--;
        this._next();
    };
    LoaderManager.prototype.onLoadError = function (resInfo, loader, msg) {
        this.onLoaded(resInfo, loader, null);
    };
    LoaderManager.prototype._endLoad = function (resInfo, content) {
        var url = resInfo.url;
        if (content == null) {
            var errorCount = this._failRes[url] || 0;
            if (errorCount < this.retryNum) {
                console.warn("[warn]Retry to load:", url);
                this._failRes[url] = errorCount + 1;
                Laya.timer.once(this.retryDelay, this, this._addReTry, [resInfo], false);
                return;
            }
            else {
                console.warn("[error]Failed to load:", url);
                this.event(/*laya.events.Event.ERROR*/ "error", url);
            }
        }
        if (this._failRes[url])
            this._failRes[url] = 0;
        delete LoaderManager._resMap[url];
        resInfo.event(/*laya.events.Event.COMPLETE*/ "complete", content);
        resInfo.offAll();
        this._infoPool.push(resInfo);
    };
    /**
    *清理指定资源地址缓存。
    *@param url 资源地址。
    *@param forceDispose 是否强制销毁，有些资源是采用引用计数方式销毁，如果forceDispose=true，则忽略引用计数，直接销毁，比如Texture，默认为false
    */
    LoaderManager.prototype.clearRes = function (url) {
        Laya.Loader.clearRes(url);
    };
    LoaderManager.prototype.clearTextureRes = function (url) {
        Laya.Loader.clearTextureRes(url);
    };
    /**
    *获取指定资源地址的资源。
    *@param url 资源地址。
    *@return 返回资源。
    */
    LoaderManager.prototype.getRes = function (url) {
        return Laya.Loader.getRes(url);
    };
    /**
    *缓存资源。
    *@param url 资源地址。
    *@param data 要缓存的内容。
    */
    LoaderManager.prototype.cacheRes = function (url, data) {
        Laya.Loader.cacheRes(url, data);
    };
    /**
    *设置资源分组。
    *@param url 资源地址。
    *@param group 分组名
    */
    LoaderManager.prototype.setGroup = function (url, group) {
        Laya.Loader.setGroup(url, group);
    };
    /**
    *根据分组清理资源。
    *@param group 分组名
    */
    LoaderManager.prototype.clearResByGroup = function (group) {
        Laya.Loader.clearResByGroup(group);
    };
    /**清理当前未完成的加载，所有未加载的内容全部停止加载。*/
    LoaderManager.prototype.clearUnLoaded = function () {
        for (var i = 0; i < this._maxPriority; i++) {
            var infos = this._resInfos[i];
            for (var j = infos.length - 1; j > -1; j--) {
                var info = infos[j];
                if (info) {
                    info.offAll();
                    this._infoPool.push(info);
                }
            }
            infos.length = 0;
        }
        this._loaderCount = 0;
        LoaderManager._resMap = {};
    };
    /**
    *根据地址集合清理掉未加载的内容
    *@param urls 资源地址集合
    */
    LoaderManager.prototype.cancelLoadByUrls = function (urls) {
        if (!urls)
            return;
        for (var i = 0, n = urls.length; i < n; i++) {
            this.cancelLoadByUrl(urls[i]);
        }
    };
    /**
    *根据地址清理掉未加载的内容
    *@param url 资源地址
    */
    LoaderManager.prototype.cancelLoadByUrl = function (url) {
        for (var i = 0; i < this._maxPriority; i++) {
            var infos = this._resInfos[i];
            for (var j = infos.length - 1; j > -1; j--) {
                var info = infos[j];
                if (info && info.url === url) {
                    infos[j] = null;
                    info.offAll();
                    this._infoPool.push(info);
                }
            }
        }
        if (LoaderManager._resMap[url])
            delete LoaderManager._resMap[url];
    };
    /**
    *@private
    *加载数组里面的资源。
    *@param arr 简单：["a.png","b.png"]，复杂[{url:"a.png",type:Loader.IMAGE,size:100,priority:1},{url:"b.json",type:Loader.JSON,size:50,priority:1}]*/
    LoaderManager.prototype._loadAssets = function (arr, complete, progress, type, priority, cache, group) {
        (priority === void 0) && (priority = 1);
        (cache === void 0) && (cache = true);
        var itemCount = arr.length;
        var loadedCount = 0;
        var totalSize = 0;
        var items = [];
        var success = true;
        for (var i = 0; i < itemCount; i++) {
            var item = arr[i];
            if ((typeof item == 'string'))
                item = { url: item, type: type, size: 1, priority: priority };
            if (!item.size)
                item.size = 1;
            item.progress = 0;
            totalSize += item.size;
            item.priority = priority;
            items.push(item);
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var progressHandler = progress ? Laya.Handler.create(null, function (item, value) {
                if (progress != null) {
                    item.progress = value;
                    var num = 0;
                    for (var j = 0; j < items.length; j++) {
                        var item1 = items[j];
                        num += item1.size * item1.progress;
                    }
                    ;
                    var v = num / totalSize;
                    progress.runWith(v);
                }
            }, [item], false) : null;
            var completeHandler = (complete || progress) ? Laya.Handler.create(null, function (item, content) {
                loadedCount++;
                item.progress = 1;
                if (!content)
                    success = false;
                if (loadedCount === itemCount && complete) {
                    complete.runWith(success);
                }
            }, [item]) : null;
            this.load(item.url, completeHandler, progressHandler, item.type, item.priority, cache, item.group || group);
        }
        return this;
    };
    LoaderManager.cacheRes = function (url, data) {
        Laya.Loader.cacheRes(url, data);
    };
    LoaderManager._resMap = {};
    return LoaderManager;
}(Laya.EventDispatcher));
var ResInfo = /** @class */ (function (_super) {
    __extends(ResInfo, _super);
    function ResInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.url = null;
        _this.type = null;
        _this.cache = false;
        _this.group = null;
        _this.ignoreCache = false;
        _this.priority = 1;
        return _this;
    }
    return ResInfo;
}(Laya.EventDispatcher));
//# sourceMappingURL=LoaderManager.js.map