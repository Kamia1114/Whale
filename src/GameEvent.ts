/** 
 * 网络通信事件的名称
 */
module S_EVENT {
    //——————————————————————发出的信息——————————————————————————————————
    /** 请求个人信息 */
    export const S_PLAYER_INFO = 'S_PLAYERINFO';
    /** 请求我的鲸鱼信息 */
    export const S_MYUNIT_INFO = 'S_MYUNIT_INFO';
    /** 请求当前地图简略鲸鱼信息 */
    export const S_MAPSHORT_INFO = 'S_MAPSHORT_INFO';
    /** 请求当前地图详情鲸鱼信息 */
    export const S_MAPDETAIL_INFO = 'S_MAPDETAIL_INFO';
    
}

/**
 * GUI事件通信
 */
module G_EVENT {
    //——————————————————————返回的信息——————————————————————————————————

    /** 请求个人信息 */
    export const G_PLAYER_INFO = 'G_PLAYERINFO';
    /** 请求我的鲸鱼信息 */
    export const G_MYUNIT_INFO = 'G_MYUNIT_INFO';
    /** 请求当前地图简略鲸鱼信息 */
    export const G_MAPSHORT_INFO = 'G_MAPSHORT_INFO';
    /** 请求当前地图详情鲸鱼信息 */
    export const G_MAPDETAIL_INFO = 'G_MAPDETAIL_INFO';
}