export interface IEffect {
    type: "Buff" | "Debuff";
    statAffected: "attack" | "defense" | "speed" | "hp" | "critRate" | "critDamage" | "lifesteal";
    value: number; // % hoặc số lượng buff/debuff
    duration: number; // Số lượt hiệu lực
}