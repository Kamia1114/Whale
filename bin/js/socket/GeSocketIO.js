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
    /*
    * name;
    */
    var GeSocketIO = /** @class */ (function (_super) {
        __extends(GeSocketIO, _super);
        function GeSocketIO(url) {
            var _this = _super.call(this, url) || this;
            _this._session = "";
            _this.zlib_open = false;
            if (url) {
                _this.connect(url);
            }
            return _this;
        }
        GeSocketIO.prototype.connect = function (url) {
            var _this = this;
            if (this._isConnected) {
                console.log("已连接，不用再连");
                return;
            }
            _super.prototype.connect.call(this, url);
            var config = {
                timeout: 5000,
                reconnection: false,
            };
            var head_str = url.slice(0, url.indexOf("//"));
            var find_str = url.replace(head_str + '//', '');
            // find path  找找连接上有没有 代理使用的path
            var fst_idx = find_str.indexOf('/');
            if ((url.length - 1) != fst_idx && fst_idx > 0) {
                // nginx 代理的机制 url 需要是地址，path 里面是 nginx代理的位置
                var tpath = find_str.slice(fst_idx, url.length);
                config.path = tpath + '/socket.io';
                url = head_str + '//' + find_str.slice(0, fst_idx);
            }
            config.forceNew = true;
            config.transports = ['websocket'];
            this._socket = io.connect(url, config);
            this._socket.on('connect', this._connected.bind(this));
            this._socket.on("session", this._onSession.bind(this));
            this._socket.on('disconnect', (function (msg) {
                // window.location.reload(true);
                _this._isConnected = false;
                console.log(msg);
                _this.event(NetSocket.SOCKET_EVENT.DISCONNECT, msg);
            }).bind(this));
            this._socket.on('zlib', function (open) {
                _this.zlib_open = open;
            });
            this._socket.on("data", this._procCmd.bind(this));
            this._socket.on('error', (function (err) {
                _this.event(NetSocket.SOCKET_EVENT.ERROR, err);
                console.log(err);
            }).bind(this));
            this._socket.on('connect_error', (function (err) {
                _this.event(NetSocket.SOCKET_EVENT.ERROR, err);
                console.log(err);
            }).bind(this));
        };
        GeSocketIO.prototype.send = function (data) {
            // if (this.zlib_open) {
            // 压缩数据发送有问题，所以暂时屏蔽掉
            //     // 过滤函数类型的数据
            data = clone(data || []);
            console.log("发送消息" + JSON.stringify(data) + '  netstate:' + this._isConnected);
            function clone(object) {
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
                            out[key] = clone(object[key]);
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
            }
            this._socket.emit('data', data);
        };
        GeSocketIO.prototype._connected = function () {
            console.log("connect success");
            this._isConnected = true;
            this.event(NetSocket.SOCKET_EVENT.CONNECT);
        };
        GeSocketIO.prototype._onSession = function (session) {
            if (this._session == "") {
                this._session = session;
            }
            this._socket.emit("session", this._session);
        };
        GeSocketIO.prototype.disconnect = function () {
            this._socket.disconnect();
            //this._socket.connect();
        };
        //处理服务器返回消息
        GeSocketIO.prototype._procCmd = function (data) {
            var parseJson = JSON.stringify(data);
            console.log("收到消息:" + parseJson);
            this.event(NetSocket.SOCKET_EVENT.DATA, data);
        };
        Object.defineProperty(GeSocketIO.prototype, "transport", {
            get: function () {
                var path = "io.engine.transport.query.transport".split(".");
                var result = this._socket;
                while (result && path.length > 0) {
                    result = result[path.shift()];
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        return GeSocketIO;
    }(NetSocket.GeSocket));
    NetSocket.GeSocketIO = GeSocketIO;
})(NetSocket || (NetSocket = {}));
//# sourceMappingURL=GeSocketIO.js.map