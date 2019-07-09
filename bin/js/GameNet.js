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
        _this._session = "";
        _this._isConnected = false;
        return _this;
    }
    GeGameNet.prototype.connect = function () {
        var _this = this;
        if (this._isConnected) {
            console.log("已连接");
            return;
        }
        var url = ""; //还没服务器连
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
        this._socket = io.connect(url, config);
        this._socket.on('connect', this._connected.bind(this));
        this._socket.on("session", this._onSession.bind(this));
        this._socket.on('disconnect', (function (msg) {
            _this._isConnected = false;
            console.log(msg);
        }).bind(this));
        this._socket.on("data", this._procCmd.bind(this));
        this._socket.on('error', (function (err) {
            console.log(err);
        }).bind(this));
        this._socket.on('connect_error', (function (err) {
            console.log(err);
        }).bind(this));
    };
    GeGameNet.prototype._connected = function () {
        console.log("connect success");
        this._isConnected = true;
        client.loginStep = EnumLoginType.Login_CONNECTED;
    };
    GeGameNet.prototype._onSession = function (session) {
        console.log(session);
        if (this._session == "") {
            this._session = session;
        }
        this._socket.emit("session", this._session);
    };
    /**
     * 消息发送
     * @param data object对象 格式如下
     *  var param = {
            "cmd": 'eat',
            "name": str||num,
        }
     */
    GeGameNet.prototype.send = function (data) {
        data = GeTool.clone(data || []);
        if (Define.isTest) {
            this.testSend(data);
            return;
        }
        console.log("发送消息" + JSON.stringify(data) + '  netstate:' + this._isConnected);
        this._socket.emit('data', data);
    };
    GeGameNet.prototype.testSend = function (data) {
        console.log("test 发送消息" + JSON.stringify(data) + '  netstate:' + this._isConnected);
        data.cmd = "G" + data.cmd.substr(1, data.cmd.length);
        console.log("模拟 收到消息:" + data);
        this._procCmd(data);
    };
    //—————————————————————— 给服务器发送消息接口 ————————————————————————————————————————/
    /**
     * 请求自己个人信息，几条动态之类的
     */
    GeGameNet.prototype.getSelfInfo = function () {
        var oppid = PlayerInfoMgr.instance.myOppID;
        var param = {
            cmd: S_EVENT.PLAYER_INFO,
            oppid: oppid
        };
        this.send(param);
    };
    /**
     * 自己的<・)))><<信息
     */
    GeGameNet.prototype.getSelfUnitInfo = function () {
        var kId = PlayerInfoMgr.instance.kID;
        this.getUnitDetailInfo([kId]);
    };
    /**
     * 地图简要的<・)))><<信息
     */
    GeGameNet.prototype.getMapUnitInfo = function (mapID) {
        var param = {
            cmd: S_EVENT.MAP_UNIT_SHORT_INFO,
            mapID: mapID
        };
        this.send(param);
    };
    /**
     * 获取kids列表里对应的<・)))><<详情信息
     * @param kIDs 要查询对象的kID
     */
    GeGameNet.prototype.getUnitDetailInfo = function (kIDs) {
        var param = {
            cmd: S_EVENT.MAP_UNIT_DETAIL_INFO,
            kIDs: kIDs
        };
        this.send(param);
    };
    /**
     * 运动
     */
    GeGameNet.prototype.sendMovementAction = function (angle) {
        var data = {
            cmd: S_EVENT.MY_MOVE_INFO,
            kID: PlayerInfoMgr.instance.kID,
            x: UnitInfoMgr.instance.selfInfo.x,
            y: UnitInfoMgr.instance.selfInfo.x,
            angle: angle,
        };
        this.send(data);
    };
    //—————————————————————— 给收到消息处理消息 ————————————————————————————————————————/
    /**
     * 消息接收
     * @param data object对象 格式如下
     *  var param = {
            "cmd": 'eat',
            "info1": any,
            "info2": any,
        }
     */
    GeGameNet.prototype._procCmd = function (data) {
        console.log("收到消息:" + data.cmd);
        switch (data.cmd) {
            case G_EVENT.PLAYER_INFO:
                data.info = { skin: "0", followId: 0, attendant: [], isSelf: true, kID: 1, x: 3800, y: 0, angle: 0, speed: false, mapId: 1 };
                PlayerInfoMgr.instance.updatePlayerInfo(data.info);
                break;
            case G_EVENT.MAP_UNIT_SHORT_INFO:
                UnitInfoMgr.instance.updateMapUnitInfo(data.info);
                break;
            case G_EVENT.MAP_UNIT_DETAIL_INFO:
                UnitInfoMgr.instance.updateMapDetailUnitInfo(data.info);
                break;
            case G_EVENT.UNIT_MOVE_INFO:
                if (data.kId == PlayerInfoMgr.instance.kID)
                    return;
                UnitInfoMgr.instance.updateMapDetailUnitInfo([data.info]);
            default:
                gUIMgr.LayaStageEvent(data.cmd, data.info);
                break;
        }
    };
    return GeGameNet;
}(Laya.EventDispatcher));
//# sourceMappingURL=GameNet.js.map