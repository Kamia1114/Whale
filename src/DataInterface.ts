interface WhaleUnitInfo extends UnitBaseInfo {
    /** 外形皮肤 */
    skin: string;
    /** 我跟随的id */
    followId: number;
    /** 我的跟随者 */
    attendant: Array<number>;
    /** 是否是我自己 */
    isSelf: boolean;
}

interface UnitBaseInfo {
    /** 单位id */
    kID: number;
    /** 单位位置 */
    x: number;
    y: number;
    /** 单位角度 分割36份 0-35 */
    angle: number;
    /** 加速度 */
    // inertia: number;
    /** 当前速度 */
    speed: boolean;
    /** map ID */
    mapId: number;
}

interface WhaleShortInfo {
    /** 单位id */
    kID: number;
    /** 单位位置 */
    x: number;
    y: number;
}