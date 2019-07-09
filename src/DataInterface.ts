interface WhaleUnitInfo extends BaseUnitInfo {
    /** 外形皮肤 */
    skin: string;
    /** 我跟随的id */
    followId: number;
    /** 我的跟随者 */
    attendant: Array<number>;
    /** 是否是我自己 */
    // isSelf: boolean;
    /** 单位角度 分割36份 0-35 */
    angle: number;
    /** 当前速度 0常速 1加速 */
    speed: number;
    /** 昵称 */
    charName:"";
}

interface BaseUnitInfo {
    /** 单位id */
    kID: number;
    /** 单位位置 */
    x: number;
    y: number;
    /** 加速度 */
    // inertia: number;
    /** map ID */
    mapId: number;
}