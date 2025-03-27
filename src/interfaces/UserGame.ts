// interfaces/UserGame.ts
import { IHero } from "./Hero";
import { IItem } from "./Item";

export interface UserGame {
  userId: number;
  resources: {
    silver: number;
    gold: number;
    diamond: number;
  };
  heroes: number[] | IHero[]; // Hỗ trợ cả mảng id và mảng object chi tiết
  items: { id: number; quantity: number }[] | IItem[]; // Hỗ trợ cả hai dạng
  level: number;
}