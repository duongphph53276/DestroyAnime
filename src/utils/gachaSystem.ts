import heroesData from "../../db.json";
import { IHero } from "../interfaces/Hero";
import { RarityType } from "../interfaces/Rarity";
import { HeroClass } from "../interfaces/HeroClass";
import { ElementGame } from "../interfaces/Elements";

export const gachaRates: Record<RarityType, number> = {
    "Common": 55,
    "Uncommon": 28, // 🛠️ Đổi từ 30 xuống 25 để khớp với db.json
    "Rare": 10,
    "Epic": 5.9,
    "Legendary": 2,
    "Mythic": 1,
    "???": 0.1,
};

// 🔹 Hàm kiểm tra và ép kiểu an toàn
const parseHero = (hero: any): IHero | null => {
    if (
        !["Tanker", "Assassin", "Fighter", "Healer", "Mage", "Archer"].includes(hero.class) ||
        !["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic", "???"].includes(hero.rarity) ||
        !["Water", "Fire", "Earth", "Wind", "Thunder", "Frost", "Light", "Dark"].includes(hero.element)
    ) {
        console.error("Dữ liệu hero không hợp lệ:", hero);
        return null;
    }

    return {
        ...hero,
        class: hero.class as HeroClass,
        rarity: hero.rarity as RarityType,
        element: hero.element as ElementGame,
    };
};

// 🔹 Hàm chọn phẩm chất dựa trên tỉ lệ
const getRandomRarity = (): RarityType => {
    const roll = Math.random() * 100;
    let cumulative = 0;

    for (const rarity in gachaRates) {
        cumulative += gachaRates[rarity as RarityType];
        if (roll < cumulative) return rarity as RarityType;
    }

    return "Common";
};

// 🔹 Hàm triệu hồi 1 tướng
export const summonHero = (): IHero | null => {
    const rarity = getRandomRarity();
    const availableHeroes = heroesData.heroes
        .map(parseHero) // ✅ Ép kiểu trước khi chọn
        .filter((hero): hero is IHero => hero !== null && hero.rarity === rarity);

    if (availableHeroes.length === 0) return null;

    return availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
};

// 🔹 Hàm triệu hồi đa số tướng
export const summonMultipleHeroes = (times: number): IHero[] => {
    const heroes: IHero[] = [];

    while (heroes.length < times) {
        const hero = summonHero();
        if (hero) heroes.push(hero);
    }

    return heroes;
};



