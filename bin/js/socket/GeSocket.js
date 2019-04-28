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
var NetSocket;
(function (NetSocket) {
    function create_socket(url) {
        return new NetSocket.GeWSSocket(url);
    }
    NetSocket.create_socket = create_socket;
    /**
     * 这个是一个虚基类，实际使用要通过
     */
    var GeSocket = /** @class */ (function (_super) {
        __extends(GeSocket, _super);
        function GeSocket(url) {
            var _this = _super.call(this) || this;
            _this.has_connected = false;
            _this._isConnected = false;
            _this.has_connected = false;
            _this.on(NetSocket.SOCKET_EVENT.CONNECT, _this, function () {
                this.has_connected = true;
            });
            return _this;
        }
        Object.defineProperty(GeSocket.prototype, "state", {
            get: function () {
                return {
                    open: this._isConnected,
                    connected: this.has_connected
                };
            },
            enumerable: true,
            configurable: true
        });
        GeSocket.prototype.Utf8ArrayToStr = function (array) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = array.length;
            i = 0;
            while (i < len) {
                c = array[i++];
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        // 0xxxxxxx
                        out += String.fromCharCode(c);
                        break;
                    case 12:
                    case 13:
                        // 110x xxxx   10xx xxxx
                        char2 = array[i++];
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        // 1110 xxxx  10xx xxxx  10xx xxxx
                        char2 = array[i++];
                        char3 = array[i++];
                        out += String.fromCharCode(((c & 0x0F) << 12) |
                            ((char2 & 0x3F) << 6) |
                            ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        };
        GeSocket.prototype.connect = function (url) {
            this.has_connected = false;
            this._url = url;
        };
        GeSocket.prototype.string2buffer = function (str) {
            // 首先将字符串转为16进制
            var val = "";
            for (var i = 0; i < str.length; i++) {
                if (val === '') {
                    val = str.charCodeAt(i).toString(16);
                }
                else {
                    val += ',' + str.charCodeAt(i).toString(16);
                }
            }
            // 将16进制转化为ArrayBuffer
            return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
                return parseInt(h, 16);
            })).buffer;
        };
        GeSocket.prototype.send = function (data) {
            //gNative.log("发送消息" + JSON.stringify(data) + '  netstate:' + this._isConnected);
        };
        GeSocket.prototype.disconnect = function () {
        };
        Object.defineProperty(GeSocket.prototype, "transport", {
            get: function () {
                return '';
            },
            enumerable: true,
            configurable: true
        });
        return GeSocket;
    }(Laya.EventDispatcher));
    NetSocket.GeSocket = GeSocket;
})(NetSocket || (NetSocket = {}));
//# sourceMappingURL=GeSocket.js.map