import { MonsterRarityType } from "./MonsterRarity";
import { ISkill } from "./Skill";
import { IDropItem } from "./DropItem";
import { ElementGame } from "./Elements";
import { MonsterClass } from "./MonsterClass";

export interface IMonster {
    id: number;
    name: string;
    description?: string;
    rarity: MonsterRarityType;
    class: MonsterClass;
    element: ElementGame;
    // level: number; mặc định 1
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    critRate: number;
    critDamage: number;
    lifesteal: number;
    // rage: number; mặc định 100% sẽ sử dụng skill
    skills: ISkill[]; // Kỹ năng chung của quái vật
    exclusiveSkills?: ISkill[]; // Kỹ năng độc quyền (Mythic, Boss)
    dropItems?: IDropItem[]; // Vật phẩm rơi ra sau trận đấu
    image: string; // 🔥 Thêm đường dẫn ảnh
}