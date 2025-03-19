import { IItem } from "./Item";

export interface IDropItem {
    item: IItem;
    dropChance: number; // Xác suất rơi (%)
    quantityRange: [number, number]; // Số lượng min-max có thể rơi
}
