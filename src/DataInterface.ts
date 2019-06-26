interface WhaleUnitInfo extends WhaleShortInfo {
    /** 外形皮肤 */
    skin: string;
    /** 我跟随的id */
    followId: number;
    /** 我的跟随者 */
    attendant: Array<number>;
    /** 是否是我自己 */
    isSelf: boolean;
    /** 是否加速 */
    speed: boolean;
    /** 单位角度 分割36份 0-35 */
    angle: number;
}

interface WhaleShortInfo {
    /** 单位id */
    kID: number;
    /** 单位位置 */
    x: number;
    y: number;
    
    /** map ID */
    mapId: number;
}