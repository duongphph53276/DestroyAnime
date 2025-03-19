import { IHero } from "./Hero";
import { ISkill } from "./Skill";

export interface IAnimeCharacter extends IHero {
    exclusiveSkills: ISkill[]; // Bắt buộc phải có kỹ năng độc quyền
}
