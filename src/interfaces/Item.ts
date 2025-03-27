import { IEffect } from "./Effect";
import { RarityType } from "./Rarity";

export interface IItem {
    id: number;
    name: string;
    description?: string;
    rarity: RarityType;
    quantity:number;
    type: "consumable" | "equipment" | "special";
    effect?: IEffect; // Nếu là vật phẩm buff
    expirationDate?: string | null; // Thời gian hết hạn (ISO format)
}
