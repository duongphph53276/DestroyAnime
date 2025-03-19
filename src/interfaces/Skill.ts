import { IEffect } from "./Effect";
import { IElementEffect } from "./ElementEffect";

export interface ISkill {
    id: number;
    name: string;
    description: string;
    cooldown: number; // Thời gian hồi chiêu (dựa trên số lần tấn công)
    rageCost: number; // Nộ khí tiêu hao để sử dụng kỹ năng
    skillType: "Active" | "Passive";
    effect: IEffect; // Hiệu ứng kỹ năng
    elementEffect?: IElementEffect; // Hiệu ứng theo nguyên tố (có hoặc không)
}
