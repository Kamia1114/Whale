/**
 * 网络通信事件的名称
 */
var S_EVENT;
(function (S_EVENT) {
    //——————————————————————发出的信息——————————————————————————————————
    /** 请求个人信息 */
    S_EVENT.PLAYER_INFO = 'S_PLAYERINFO';
    /** 发送我的鲸鱼信息 */
    S_EVENT.MY_MOVE_INFO = 'S_UNIT_MOVE_INFO';
    /** 请求当前地图简略鲸鱼信息 */
    S_EVENT.MAP_UNIT_SHORT_INFO = 'S_MAP_UNIT_SHORT_INFO';
    /** 请求当前地图详情鲸鱼信息 */
    S_EVENT.MAP_UNIT_DETAIL_INFO = 'S_MAP_UNIT_DETAIL_INFO';
})(S_EVENT || (S_EVENT = {}));
/**
 * 客户端事件通信
 */
var G_EVENT;
(function (G_EVENT) {
    //——————————————————————返回的信息——————————————————————————————————
    /** 收到个人信息 */
    G_EVENT.PLAYER_INFO = 'G_PLAYERINFO';
    /** 收到我的鲸鱼信息 */
    G_EVENT.UNIT_MOVE_INFO = 'G_UNIT_MOVE_INFO';
    /** 收到当前地图简略鲸鱼信息 */
    G_EVENT.MAP_UNIT_SHORT_INFO = 'G_MAP_UNIT_SHORT_INFO';
    /** 收到当前地图详情鲸鱼信息 */
    G_EVENT.MAP_UNIT_DETAIL_INFO = 'G_MAP_UNIT_DETAIL_INFO';
})(G_EVENT || (G_EVENT = {}));
//# sourceMappingURL=GameEvent.js.map