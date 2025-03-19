import { IHero } from "./Hero";
import { IItem } from "./Item";

export interface IGacha {
    roll(): IHero | IItem; // Triệu hồi hero hoặc vật phẩm
}
