import { IItem } from "./Item";

export interface IEvolutionStage {
    stage: number; // Bậc tiến hóa (+10, +20, ...)
    requiredLevel: number; // Mốc level yêu cầu
    requiredMaterials: IItem[]; // Nguyên liệu cần có
    nextForm: string; // Tên hình thái tiếp theo
}
