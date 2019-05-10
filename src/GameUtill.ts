/**
 * 游戏各类工具放在这里
 */
class GeGameUtill{

    constructor() {  }
    
    // static getLanguageTxt(kId: string, ...arg): string {
    //     var content = gTableMgr.getLanguage(kId);
    //     if (!content || content.length <= 0) {
    //         return `语言表未配置id = ${kId}`;
    //     }
    //     if (arg) {
    //         if (arg instanceof Array) {
    //             let len = arg.length;
    //             for (let i = 0; i < len; ++i) {
    //                 var rp = arg[i];
    //                 content = content.replace('{#}', rp);
    //             }
    //         }
    //         else if (typeof arg == 'string') {
    //             content = content.replace('{#}', arg);
    //         }
    //     }
    //     return content;
    // }
    
}

class GeTool {
    static clone<T>(object: T): T {
        var out: any = {};
        if (object instanceof Array) {
            out = [];
        }

        if (typeof object == 'object') {
            for (var key in object) {
                if (typeof object[key] == 'function' || object[key] instanceof Laya.Handler) {
                    continue;
                }
                if (object[key] == null || typeof object[key] == "undefined") {
                    out[key] = null;
                }
                else if (typeof object[key] == 'object') {
                    out[key] = GeTool.clone(object[key]);
                }
                else {
                    out[key] = object[key];
                }
            }
        }
        else {
            out = object;
        }
        return <T>out;
    }

    static copy<T>(Dst: T, Src: T) {
        for (var key in Src) {
            Dst[key] = GeTool.clone(Src[key]);
        }
    }

    static getTargetPoint(angle, distance) :{dX:number, dY:number}
    {
        let rObj:{dX:number, dY:number};
        if(angle%9 == 0) {
            if(angle == 0) {
                rObj.dX = distance;
                rObj.dY = 0;
            } else if(angle == 18) {
                rObj.dX = -distance;
                rObj.dY = 0;
            } else if(angle == 9) {
                rObj.dX = 0;
                rObj.dY = distance;
            } else if(angle == 27) {
                rObj.dX = 0;
                rObj.dY = -distance;
            }
        } else {
            if (angle>27 && angle<9) {
                let targetX = Math.sin(angle*10*Math.PI/180)*distance;//移动的x距离
                let targetY = Math.sin(angle*10*Math.PI/180)*distance;//移动的x距离
            } else {
                
            }
        }
        return rObj;
    }
}

/**************** 全局函数（如非必要请勿使用全局函数, 往GeUtil里添加接口即可）  *********/
// var __lang = GeGameUtill.getLanguageTxt;
/**************** 全局函数End  ******************************************************/