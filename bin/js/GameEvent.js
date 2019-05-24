/**
 * 网络通信事件的名称
 */
var S_EVENT;
(function (S_EVENT) {
    //——————————————————————发出的信息——————————————————————————————————
    /** 请求个人信息 */
    S_EVENT.S_PLAYER_INFO = 'S_PLAYERINFO';
    /** 请求我的鲸鱼信息 */
    S_EVENT.S_MYUNIT_INFO = 'S_MYUNIT_INFO';
    /** 请求当前地图简略鲸鱼信息 */
    S_EVENT.S_MAPSHORT_INFO = 'S_MAPSHORT_INFO';
    /** 请求当前地图详情鲸鱼信息 */
    S_EVENT.S_MAPDETAIL_INFO = 'S_MAPDETAIL_INFO';
    //——————————————————————返回的信息——————————————————————————————————
    /** 请求个人信息 */
    S_EVENT.G_PLAYER_INFO = 'G_PLAYERINFO';
    /** 请求我的鲸鱼信息 */
    S_EVENT.G_MYUNIT_INFO = 'G_MYUNIT_INFO';
    /** 请求当前地图简略鲸鱼信息 */
    S_EVENT.G_MAPSHORT_INFO = 'G_MAPSHORT_INFO';
    /** 请求当前地图详情鲸鱼信息 */
    S_EVENT.G_MAPDETAIL_INFO = 'G_MAPDETAIL_INFO';
})(S_EVENT || (S_EVENT = {}));
/**
 * GUI事件通信
 */
var G_EVENT;
(function (G_EVENT) {
    G_EVENT.GameInfo_Get = "GameInfo_Get";
})(G_EVENT || (G_EVENT = {}));
//# sourceMappingURL=GameEvent.js.map