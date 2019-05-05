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
var whaleUnit = /** @class */ (function (_super) {
    __extends(whaleUnit, _super);
    function whaleUnit(data) {
        return _super.call(this, data) || this;
    }
    whaleUnit.prototype._init = function () {
        this._body = new Laya.Image("whale/whale" + this._data.skin + ".png");
        this.addChild(this._body);
        this._body.anchorX = 0.5;
        this._body.anchorY = 0.5;
        this._body.x = Laya.stage.width / 2;
        this._body.y = Laya.stage.height / 2;
        this._body.scale(0.5, 0.5);
    };
    whaleUnit.prototype._update = function (info) {
        for (var key in info) {
            if (!this._data[key] || this._data[key] != info[key]) {
                //数据变动了
                this._data[key] = info[key];
                this._isChange = true;
            }
        }
    };
    Object.defineProperty(whaleUnit.prototype, "isChange", {
        get: function () {
            return this._isChange;
        },
        set: function (val) {
            this._isChange = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(whaleUnit.prototype, "uPoint", {
        get: function () {
            return this._data.point;
        },
        enumerable: true,
        configurable: true
    });
    return whaleUnit;
}(baseUnit));
//# sourceMappingURL=whaleUnit.js.map