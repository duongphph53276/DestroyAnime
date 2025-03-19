import { ElementType } from "react";
import { IEffect } from "./Effect";

export interface IBattleEntity {
    id: number;
    name: string;
    speed: number;
    rage: number;
    isTurnReady: boolean; // Nếu true thì nhân vật được tấn công
    positionOnSpeedBar: number; // Vị trí trên thanh tốc độ (0-100%)
}
