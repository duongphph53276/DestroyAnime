import { ElementType } from "react";
import { MonsterRarityType } from "./MonsterRarity";
import { ISkill } from "./Skill";
import { IDropItem } from "./DropItem";

export interface IMonster {
    id: number;
    name: string;
    description?: string;
    rarity: MonsterRarityType;
    element: ElementType;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    critRate: number;
    critDamage: number;
    lifesteal: number;
    rage: number;
    skills: ISkill[]; // Kỹ năng chung của quái vật
    exclusiveSkills?: ISkill[]; // Kỹ năng độc quyền (Boss, Legend)
    dropItems?: IDropItem[]; // Vật phẩm rơi ra sau trận đấu
}