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
/**
 * 游戏网络相关
 */
var GeGameNet = /** @class */ (function (_super) {
    __extends(GeGameNet, _super);
    function GeGameNet() {
        var _this = _super.call(this) || this;
        _this._reconnect_count = 5;
        return _this;
    }
    GeGameNet.prototype.connect = function () {
        if (this.mySocket) {
            this.mySocket.disconnect();
            this.mySocket = null;
        }
        console.log("connect begin:" + GameConfig.gameNet.url);
        this.mySocket = NetSocket.create_socket(GameConfig.gameNet.url);
        this.mySocket.on(NetSocket.SOCKET_EVENT.CONNECT, this, this._connected);
        this.mySocket.on(NetSocket.SOCKET_EVENT.DISCONNECT, this, this.socketDisconnect);
        this.mySocket.on(NetSocket.SOCKET_EVENT.DATA, this, this._procCmd);
        this.mySocket.on(NetSocket.SOCKET_EVENT.ERROR, this, this.socketError);
    };
    GeGameNet.prototype._connected = function () {
        console.log('链接反馈');
        this.event(NetSocket.SOCKET_EVENT.CONNECT);
    };
    /**连接断开 */
    GeGameNet.prototype.socketDisconnect = function (msg) {
        var _this = this;
        //IOS切后台再且回来会报错，加个延时调用就正常了，不知道原因
        Laya.timer.frameOnce(10, this, function () {
            _this._check_reconnect("113");
            console.log('重连中...');
            // GeUIFacade.showFatallyError(__lang("113"), Laya.Handler.create(this, this.startReconnect.bind(this), null));
        });
        this.mySocket.disconnect();
    };
    GeGameNet.prototype._check_reconnect = function (lan_num) {
        this._reconnect_count--;
        if (this._reconnect_count >= 0) {
        }
        else {
            // 通知玩家重连次数太多，重新进入一下游戏
            // GeUIFacade.showFatallyError(__lang("172"));
        }
    };
    /**连接错误 */
    GeGameNet.prototype.socketError = function (err) {
        this._check_reconnect("114");
        // GeUIFacade.showFatallyError(__lang("114"), Laya.Handler.create(this, this.startReconnect.bind(this), null));
        console.log(err);
    };
    GeGameNet.prototype._procCmd = function (data) {
        console.log("收到消息:" + data.cmd);
        switch (data.cmd) {
            case 'kicked': {
                // 表示一定是被人顶号了
                break;
            }
            case 'loginfailed':
                //alert("登陆失败");
                break;
            case 'loginsuccess':
                //alert("登陆成功");
                break;
            default:
                // gUIMgr.LayaStageEvent(data.cmd, data);
                break;
        }
    };
    return GeGameNet;
}(Laya.EventDispatcher));
//# sourceMappingURL=GameNet.js.map