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
        // this._isSelf = this._data.kID == UnitDataMgr.instance.selfInfo.kID;
    };
    Object.defineProperty(whaleUnit.prototype, "KID", {
        get: function () {
            return this._data.kID;
        },
        enumerable: true,
        configurable: true
    });
    whaleUnit.prototype.gotoPoint = function (p) {
        Laya.Tween.to(this, { x: p.x, y: p.y }, 1000 * Define.twConstVal);
    };
    return whaleUnit;
}(baseUnit));
//# sourceMappingURL=whaleUnit.js.map