class ResMgr{
    private loadingList: HashMap<number> = new HashMap<number>();
    private genLoadID: number = 0;
    private _bIsLoading = false;

    constructor() {
    }

    public startLoading(): void {
        this.loadPermanentResource();
    }

    /**
     *  加载常驻内存图片资源
     */
    public loadPermanentResource(): void {
        var urls = [
            { url: "res/atlas/icon.json", type: Laya.Loader.ATLAS },
            { url: "res/atlas/particle.json", type: Laya.Loader.ATLAS },
            { url: "res/atlas/whale.json", type: Laya.Loader.ATLAS },
        ];

        this._bIsLoading = true;
        this.addLoading(urls, Laya.Handler.create(this, () => {
            client.loginStep = EnumLoginType.Resource_COMPLETED;
            this._bIsLoading = false;
        }));
    }

    public addLoading(url: any, complete?: Laya.Handler, progress?: Laya.Handler, type?: string, priority?: number, cache?: boolean, group?: string, ignoreCache?: boolean) {
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
    }

    private _loadComplete(cb: Laya.Handler, loadID: string, finish: boolean | string) {
        var list = this.loadingList.get(loadID);
        list[1] = 1;
        this.loadingList.set(loadID, list);
        if (cb) cb.runWith(finish);
    }

    private _loading(cb: Laya.Handler, loadID: string, v: number) {
        var list = this.loadingList.get(loadID);
        list[1] = v;
        this.loadingList.set(loadID, list);
        if (cb) cb.runWith(v);
    }

    // 获取一个序列帧动画的帧数
    public getAnimationSize(animation: string) {
        var aniM = <Array<string>>Laya.Animation.framesMap[animation];
        if (aniM) {
            return aniM.length;
        }

        return 0;
    }

    //管理资源，采用引用计数法
    private referenceMap: Object;
    //增加某个资源的引用
    public addReference(panelNo: string, url: string): void {
        let refCount: number;
        this.referenceMap || (this.referenceMap = new Object);
        if (!this.referenceMap[url]) {
            this.referenceMap[url] = 1;
            refCount = 1;
        } else {
            ++this.referenceMap[url];
            refCount = this.referenceMap[url];
        }
    }

    //移除某个资源的引用
    public removeReference(panelNo: string, url: string): void {
        let refCount: number;
        if (this.referenceMap) {
            --this.referenceMap[url];
            refCount = this.referenceMap[url];
        } else {
            refCount = -100;
        }
    }
}

class HashMap<T>{
    _data = {};

    constructor(_data?: Object) {
        if (_data) {
            this._data = _data;
        }
    }

    get(key: string | number) {
        return <Array<T>>this._data[key]
    }

    add(key: string | number, v: T) {
        if (!this._data[key]) {
            this._data[key] = [];
        }

        this._data[key].push(v);
    }

    set(key: string | number, v: Array<T>) {
        this._data[key] = v;
    }

    get keys() {
        return Object.keys(this._data);
    }

    del(key: string | number) {
        delete this._data[key];
    }

    clear() {
        this._data = {};
    }
}