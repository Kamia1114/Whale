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
/*
* name;
*/
var baseUnit = /** @class */ (function (_super) {
    __extends(baseUnit, _super);
    function baseUnit(data) {
        var _this = _super.call(this) || this;
        _this._data = data;
        _this._init();
        return _this;
    }
    baseUnit.prototype._init = function () {
        //创建时初始化固定属性
    };
    baseUnit.prototype._update = function (info) {
    };
    Object.defineProperty(baseUnit.prototype, "iPoint", {
        get: function () {
            return new Laya.Point(this._data.x, this._data.y);
        },
        enumerable: true,
        configurable: true
    });
    return baseUnit;
}(Laya.Sprite));
//# sourceMappingURL=baseUnit.js.map