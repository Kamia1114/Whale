/**
 * 游戏网络相关
 */
class GeGameNet extends Laya.EventDispatcher {
    private _socket: SocketIOClient.Socket;
    private _session: string = "";
    protected _isConnected = false;
    
    constructor() { super(); }

    public connect(): void {
        if (this._isConnected) {
            console.log("已连接");
            return;
        }

        let url = "";//还没服务器连

        var config: SocketIOClient.ConnectOpts = {
            timeout: 5000,
            reconnection: false,
        };

        let head_str = url.slice(0, url.indexOf("//"));
        let find_str = url.replace(head_str + '//', '');

        // find path  找找连接上有没有 代理使用的path
        let fst_idx = find_str.indexOf('/');

        if ((url.length - 1) != fst_idx && fst_idx > 0) {
            // nginx 代理的机制 url 需要是地址，path 里面是 nginx代理的位置
            let tpath = find_str.slice(fst_idx, url.length);
            config.path = tpath + '/socket.io';
            url = head_str + '//' + find_str.slice(0, fst_idx);
        }

        this._socket = io.connect(url, config);
        this._socket.on('connect', this._connected.bind(this));
        this._socket.on("session", this._onSession.bind(this));
        this._socket.on('disconnect', ((msg) => {
            this._isConnected = false;
            console.log(msg);
        }).bind(this));
        this._socket.on("data", this._procCmd.bind(this));
        this._socket.on('error', ((err) => {
            console.log(err);
        }).bind(this));
        this._socket.on('connect_error', ((err) => {
            console.log(err);
        }).bind(this));
        
    }
    
    private _connected(): void {
        console.log("connect success");
        this._isConnected = true;
        client.loginStep = EnumLoginType.Login_CONNECTED;
    }

    private _onSession(session) {
        console.log(session);
        if (this._session == "") {
            this._session = session;
        }
        this._socket.emit("session", this._session);
    }

    /**
     * 消息发送
     * @param data object对象 格式如下
     *  var param = {
            "cmd": 'eat',
            "name": str||num,
        }
     */
    public send(data: any) {
        data = GeTool.clone(data || []);
        if(Define.isTest) {
            this.testSend(data);
            return;
        }
        console.log("发送消息" + JSON.stringify(data) + '  netstate:' + this._isConnected);
        this._socket.emit('data', data);
    }

    public testSend(data: any) {
        console.log("test 发送消息" + JSON.stringify(data) + '  netstate:' + this._isConnected);
        data.cmd = "G" + data.cmd.substr(1, data.cmd.length);
        console.log("模拟 收到消息:" + data);
        this._procCmd(data);
    }


    //—————————————————————— 给服务器发送消息接口 ————————————————————————————————————————/
    /**
     * 请求自己个人信息，几条动态之类的
     */
    public getSelfInfo() {
        let oppid = PlayerInfoMgr.instance.myOppID
        var param = {
            cmd: S_EVENT.PLAYER_INFO,
            oppid: oppid
        }
        this.send(param);
    }

    /**
     * 自己的<・)))><<信息
     */
    public getSelfUnitInfo() {
        let kId = PlayerInfoMgr.instance.kID;
        this.getUnitDetailInfo([kId]);
    }

    /**
     * 地图简要的<・)))><<信息
     */
    public getMapUnitInfo(mapID) {
        var param = {
            cmd: S_EVENT.MAP_UNIT_SHORT_INFO,
            mapID: mapID
        }
        this.send(param);
    }

    /**
     * 获取kids列表里对应的<・)))><<详情信息
     * @param kIDs 要查询对象的kID
     */
    public getUnitDetailInfo(kIDs: Array<number>) {
        var param = {
            cmd: S_EVENT.MAP_UNIT_DETAIL_INFO,
            kIDs: kIDs
        }
        this.send(param);
    }

    /**
     * 运动
     */
    public sendMovementAction(angle:number) {
        let data = {
            cmd: S_EVENT.MY_MOVE_INFO,
            kID: PlayerInfoMgr.instance.kID,
            x: UnitInfoMgr.instance.selfInfo.x,
            y: UnitInfoMgr.instance.selfInfo.x,
            angle: angle,
        }
        this.send(data);
    }

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
    private _procCmd(data: any):void {
        console.log("收到消息:" + data.cmd);
        switch (data.cmd) {
            case G_EVENT.PLAYER_INFO: 
                data.info = {skin:"0", followId:0, attendant:[], isSelf:true, kID:1, x:3800, y:0, angle:0, speed:false, mapId:1};
                PlayerInfoMgr.instance.updatePlayerInfo(data.info);
                break;
            case G_EVENT.MAP_UNIT_SHORT_INFO:
                UnitInfoMgr.instance.updateMapUnitInfo(data.info);
                break;
            case G_EVENT.MAP_UNIT_DETAIL_INFO:
                UnitInfoMgr.instance.updateMapDetailUnitInfo(data.info);
                break;
            case G_EVENT.UNIT_MOVE_INFO:
                if(data.kId == PlayerInfoMgr.instance.kID) return;
                UnitInfoMgr.instance.updateMapDetailUnitInfo([data.info]);
            default:
                gUIMgr.LayaStageEvent(data.cmd, data.info);
                break;
        }
    }
}