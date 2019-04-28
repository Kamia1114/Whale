/**
 * 游戏读表
 */
class GeGameTable {
    
    private readonly TAB_LANGUAGE = "res/table/Language_CN.json";
    private readonly TAB_CONFIG = "res/table/Config.json";

    private m_languageRes:any;

    constructor() {  }

    public _initLanguage() {
        let assets = [];
        assets.push({ url: this.TAB_LANGUAGE, type: Laya.Loader.JSON });
        Laya.loader.load(assets ,Laya.Handler.create(this,this.onLoadComplete));
    }

    private onLoadComplete()
    {
        var json:JSON=Laya.loader.getRes(this.TAB_LANGUAGE);
        for(var key in json) {
            console.info("key:" + key + " ---> "+ json[key]);
            this.m_languageRes[key] = json[key];
        }
    }

    public getLanguage(id: string) {
        return this.m_languageRes[id] ? this.m_languageRes[id] : "";
    }
    
    
}