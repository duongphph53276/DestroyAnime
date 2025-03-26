import { RarityType } from "./Rarity";
import { HeroClass } from "./HeroClass";
import { ISkill } from "./Skill";
import { IEvolutionStage } from "./EvolutionStage";
import { ElementGame } from "./Elements";

export interface IHero {
    id: number;
    name: string;
    description?: string; // Mô tả hero
    class: HeroClass;
    rarity: RarityType;
    element: ElementGame;
    // level: number; mac dinh 1
    // exp: number; mac dinh 0, exp sẽ tăng theo cấp số nhân cho mỗi một lv cần tăng
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    critRate: number; // Tỷ lệ chí mạng (%)
    critDamage: number; // Sát thương chí mạng (%)
    lifesteal: number; // Hút máu (%)
    rage: number; // Nộ khí (dùng để kích hoạt skill) (thường là 100% sẽ kích hoạt nộ khí)
    skills: ISkill[];
    exclusiveSkills?: ISkill[];
    evolution?: IEvolutionStage[];
    image: string; // 🔥 Thêm đường dẫn ảnh
}