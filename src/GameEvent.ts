/** 
 * 网络通信事件的名称
 */
module S_EVENT {
    //——————————————————————发出的信息——————————————————————————————————
    /** 请求个人信息 */
    export const PLAYER_INFO = 'S_PLAYERINFO';
    /** 发送我的鲸鱼信息 */
    export const MY_MOVE_INFO = 'S_UNIT_MOVE_INFO';
    /** 请求当前地图简略鲸鱼信息 */
    export const MAP_UNIT_SHORT_INFO = 'S_MAP_UNIT_SHORT_INFO';
    /** 请求当前地图详情鲸鱼信息 */
    export const MAP_UNIT_DETAIL_INFO = 'S_MAP_UNIT_DETAIL_INFO';
    
}

/**
 * 客户端事件通信
 */
module G_EVENT {
    //——————————————————————返回的信息——————————————————————————————————

    /** 收到个人信息 */
    export const PLAYER_INFO = 'G_PLAYERINFO';
    /** 收到我的鲸鱼信息 */
    export const UNIT_MOVE_INFO = 'G_UNIT_MOVE_INFO';
    /** 收到当前地图简略鲸鱼信息 */
    export const MAP_UNIT_SHORT_INFO = 'G_MAP_UNIT_SHORT_INFO';
    /** 收到当前地图详情鲸鱼信息 */
    export const MAP_UNIT_DETAIL_INFO = 'G_MAP_UNIT_DETAIL_INFO';
}

