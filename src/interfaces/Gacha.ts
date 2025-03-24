import { IHero } from "./Hero";
export interface IGacha {
    roll(): IHero; // Triệu hồi hero hoặc vật phẩm
    rollMultiple(times: number): IHero[]; // Triệu hồi nhiều tướng
}
