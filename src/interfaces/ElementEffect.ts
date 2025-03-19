import { ElementType } from "react";

export interface IElementEffect {
    element: ElementType;
    effectType: "Burn" | "Slow" | "Armor Break" | "Evasion Boost" | "Paralyze" | "Weaken" | "Heal on Hit" | "Curse";
    duration: number; // Số lượt hiệu lực
    value: number; // % ảnh hưởng (ví dụ: Burn gây 5% HP mỗi lượt)
}
