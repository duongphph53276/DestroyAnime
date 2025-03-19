import { ElementType } from "react";
import { RarityType } from "./Rarity";
import { HeroClass } from "./HeroClass";
import { ISkill } from "./Skill";
import { IEvolutionStage } from "./EvolutionStage";

export interface IHero {
    id: number;
    name: string;
    description?: string; // Mô tả hero
    class: HeroClass;
    rarity: RarityType;
    element: ElementType;
    level: number;
    experience: number;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    critRate: number; // Tỷ lệ chí mạng (%)
    critDamage: number; // Sát thương chí mạng (%)
    lifesteal: number; // Hút máu (%)
    rage: number; // Nộ khí (dùng để kích hoạt skill)
    skills: ISkill[];
    exclusiveSkills?: ISkill[];
    evolution?: IEvolutionStage[];
}