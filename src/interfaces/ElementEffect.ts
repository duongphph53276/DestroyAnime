import { ElementGame } from "./Elements";

export interface IElementEffect {
    element: ElementGame;
    effectType: "Burn" | "Slow" | "Armor Break" | "Evasion Boost" | "Paralyze" | "Weaken" | "Heal on Hit" | "Curse";
    duration: number; // Số lượt hiệu lực
    value: number; // % ảnh hưởng (ví dụ: Burn gây 5% HP mỗi lượt)
}
