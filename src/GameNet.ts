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

    private _procCmd(data: any):void {
        console.log("收到消息:" + data.cmd);
        switch (data.cmd) {
            case G_EVENT.G_PLAYER_INFO: 
                PlayerInfoMgr.instance.updatePlayerInfo(data.info)
                break;
            default:
                gUIMgr.LayaStageEvent(data.cmd, data);
                break;
        }
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
        console.log("发送消息" + JSON.stringify(data) + '  netstate:' + this._isConnected);
        this._socket.emit('data', data);
    }

    public testSend(data: any) {
        console.log("test 发送消息" + JSON.stringify(data) + '  netstate:' + this._isConnected);
        console.log("模拟 收到消息:" + data);
        gUIMgr.LayaStageEvent(data, data);
    }

    public getSelfInfo() {
        var param = {
            "cmd": S_EVENT.S_PLAYER_INFO,
            "oppid": PlayerInfoMgr.instance.myOppID
        }
        this.testSend(param);
    }
}