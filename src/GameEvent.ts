/** 
 * 网络通信事件的名称
 */
module S_EVENT {
    //——————————————————————发出的信息——————————————————————————————————
    /** 请求个人信息 */
    export const PLAYER_INFO = 'S_PLAYER_INFO';
    /** 发送移动信息 */
    export const MY_MOVE_INFO = 'S_UNIT_MOVE_INFO';
    /** 请求当前地图简略鲸鱼信息 */
    export const MAP_UNIT_SHORT_INFO = 'S_MAP_UNIT_SHORT_INFO';
    /** 请求当前地图详情鲸鱼信息 */
    export const MAP_UNIT_DETAIL_INFO = 'S_MAP_UNIT_DETAIL_INFO';
    
}

module G_EVENT {
    //——————————————————————返回的信息——————————————————————————————————

    /** 收到个人信息 */
    export const PLAYER_INFO = 'G_PLAYER_INFO';
    /** 收到移动信息 */
    export const UNIT_MOVE_INFO = 'G_UNIT_MOVE_INFO';
    /** 收到当前地图简略鲸鱼信息 */
    export const MAP_UNIT_SHORT_INFO = 'G_MAP_UNIT_SHORT_INFO';
    /** 收到当前地图详情鲸鱼信息 */
    export const MAP_UNIT_DETAIL_INFO = 'G_MAP_UNIT_DETAIL_INFO';
}


/** 
 * 各种事件的名称
 */
module EVENT {
    export const PLAYER_INFO = 'PLAYER_INFO';
    export const MY_UNIT_INFO = 'MY_UNIT_INFO';
    export const UNIT_MOVE_INFO = "UNIT_MOVE_INFO";
}