/**
 * 游戏各类工具放在这里
 */
var GeGameUtill = /** @class */ (function () {
    function GeGameUtill() {
    }
    GeGameUtill.getLanguageTxt = function (kId) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        var content = gTableMgr.getLanguage(kId);
        if (!content || content.length <= 0) {
            return "\u8BED\u8A00\u8868\u672A\u914D\u7F6Eid = " + kId;
        }
        if (arg) {
            if (arg instanceof Array) {
                var len = arg.length;
                for (var i = 0; i < len; ++i) {
                    var rp = arg[i];
                    content = content.replace('{#}', rp);
                }
            }
            else if (typeof arg == 'string') {
                content = content.replace('{#}', arg);
            }
        }
        return content;
    };
    return GeGameUtill;
}());
/**************** 全局函数（如非必要请勿使用全局函数, 往GeUtil里添加接口即可）  *********/
var __lang = GeGameUtill.getLanguageTxt;
/**************** 全局函数End  ******************************************************/ 
//# sourceMappingURL=GameUtill.js.map