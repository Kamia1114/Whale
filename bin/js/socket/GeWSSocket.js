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
    var GeWSSocket = /** @class */ (function (_super) {
        __extends(GeWSSocket, _super);
        function GeWSSocket(url) {
            var _this = _super.call(this, url) || this;
            _this._session = "";
            _this.zlib_open = false;
            _this._heart_num_ = 0;
            if (url) {
                _this.connect(url);
            }
            return _this;
        }
        GeWSSocket.prototype.connect = function (url) {
            var _this = this;
            if (this._isConnected) {
                this.debug("已连接");
                return;
            }
            _super.prototype.connect.call(this, url);
            var https = false;
            if (url.indexOf('http://') == 0) {
                url = url.replace('http://', '');
            }
            else if (url.indexOf('https://') == 0) {
                url = url.replace('https://', '');
                https = true;
            }
            if (https) {
                url = "wss://" + url;
            }
            else {
                url = "ws://" + url;
            }
            this._socket = new Laya.Socket();
            this._socket.connectByUrl(url);
            // this.mySocket = io.connect('http://127.0.0.1:6005',{'force new connection': true})
            this._socket.on(Laya.Event.OPEN, this, this._connected);
            this._socket.on("session", this, this._onSession);
            this._socket.on(Laya.Event.CLOSE, this, function (msg) {
                _this._isConnected = false;
                console.log(msg);
                _this.event(NetSocket.SOCKET_EVENT.DISCONNECT, msg);
            });
            this._socket.on('zlib', this, function (open) {
                _this.zlib_open = open;
            });
            this._socket.on(Laya.Event.MESSAGE, this, this._procCmd);
            this._socket.on(Laya.Event.ERROR, this, function (err) {
                _this.event(NetSocket.SOCKET_EVENT.ERROR, err);
                console.log(err);
            });
        };
        GeWSSocket.prototype.send = function (data) {
            console.log("发送消息" + JSON.stringify(data) + '  netstate:' + this._isConnected);
            // if (this.zlib_open) {
            // 压缩数据发送有问题，所以暂时屏蔽掉
            //     // 过滤函数类型的数据
            //     data = GeTool.clone(data || []);
            //     var msg = JSON.stringify(data);
            //     if (msg.length > 512) {
            //         try {
            //             var msgbuff = this.string2buffer(msg);
            //             var zmsg = new Zlib.Deflate(msg).compress();
            //             this._socket.emit('zlibdata', zmsg);
            //             return;
            //         }
            //         catch (e) {
            //         }
            //     }
            // }
            this._socket && this._socket.send(JSON.stringify(data));
        };
        GeWSSocket.prototype._heart_update_ = function () {
            if (!this._socket.connected) {
                if (!this._isConnected)
                    return;
                this.event(NetSocket.SOCKET_EVENT.DISCONNECT);
                this._isConnected = false;
                return;
            }
            this.send({
                cmd: "heart",
                t: Date.now()
            });
        };
        GeWSSocket.prototype._connected = function () {
            console.log("connect success");
            this._isConnected = true;
            this.event(NetSocket.SOCKET_EVENT.CONNECT);
            if (this._heart_num_) {
                clearInterval(this._heart_num_);
            }
            this._heart_num_ = setInterval(this._heart_update_.bind(this), 3 * 1000);
        };
        GeWSSocket.prototype._onSession = function (session) {
            if (this._session == "") {
                this._session = session;
            }
            // this._socket.emit("session", this._session);
        };
        GeWSSocket.prototype.disconnect = function () {
            // this._socket.disconnect();
            this._socket.close();
            if (this._heart_num_) {
                clearInterval(this._heart_num_);
                this._heart_num_ = 0;
            }
        };
        //处理服务器返回消息
        GeWSSocket.prototype._procCmd = function (data) {
            var parseJson = JSON.parse(data);
            switch (parseJson.__cmd__) {
                case 'data': {
                    parseJson = parseJson.data;
                    break;
                }
                case 'h': {
                    // 心跳返回
                    break;
                }
                default: break;
            }
            this.event(NetSocket.SOCKET_EVENT.DATA, parseJson);
        };
        GeWSSocket.prototype.debug = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            console.log.apply(console, [arg.shift()].concat(arg));
        };
        Object.defineProperty(GeWSSocket.prototype, "transport", {
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
        return GeWSSocket;
    }(NetSocket.GeSocket));
    NetSocket.GeWSSocket = GeWSSocket;
    NetSocket.SOCKET_EVENT = {
        CONNECT: "connect",
        DISCONNECT: "disconnect",
        DATA: "data",
        ERROR: "error",
    };
})(NetSocket || (NetSocket = {}));
//# sourceMappingURL=GeWSSocket.js.map