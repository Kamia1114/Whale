/**
 * 游戏各类工具放在这里
 */
var GeGameUtill = /** @class */ (function () {
    function GeGameUtill() {
    }
    return GeGameUtill;
}());
var GeTool = /** @class */ (function () {
    function GeTool() {
    }
    GeTool.clone = function (object) {
        var out = {};
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
        return out;
    };
    GeTool.copy = function (Dst, Src) {
        for (var key in Src) {
            Dst[key] = GeTool.clone(Src[key]);
        }
    };
    /**
     *
     * @param point 当前位置
     * @param angle 运动角度
     */
    GeTool.getTargetPoint = function (point, angle) {
        // let cPoint:Laya.Point = new Laya.Point(GameConfig.width/2,GameConfig.height/2);
        var radian = angle * Math.PI / 180; //弧度
        var distance = Define.twConstVal * (UnitInfoMgr.instance.selfInfo.speed ? Define.speedFast : Define.speedNormal); //根据当前加速状态极端移动距离
        var targetX = Math.round(Math.cos(radian) * distance); //移动的x距离
        var targetY = Math.round(Math.sin(radian * 10 * Math.PI / 180) * distance); //移动的y距离
        console.log("angle: ", radian * 180 / Math.PI, "distance: ", distance, "X: ", targetX + point.x, "Y: ", targetY + point.y);
        return new Laya.Point(point.x + targetX, point.y + targetY);
        ;
    };
    return GeTool;
}());
/**************** 全局函数（如非必要请勿使用全局函数, 往GeUtil里添加接口即可）  *********/
// var __lang = GeGameUtill.getLanguageTxt;
/**************** 全局函数End  ******************************************************/ 
//# sourceMappingURL=GameUtill.js.map