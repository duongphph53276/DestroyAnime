import { useState } from "react";
import { summonHero, summonMultipleHeroes } from "../../utils/gachaSystem";
import { IHero } from "../../interfaces/Hero";

const rarityColors: Record<string, string> = {
  Common: "border-gray-400 bg-gray-200 text-gray-800",
  Uncommon: "border-green-500 bg-green-200 text-green-800",
  Rare: "border-blue-500 bg-blue-200 text-blue-800",
  Epic: "border-purple-500 bg-purple-200 text-purple-800",
  Legendary: "border-yellow-500 bg-yellow-200 text-yellow-800",
  Mythic: "border-red-500 bg-red-200 text-red-800",
  "???": "border-pink-500 bg-gradient-to-r from-pink-500 to-purple-500 text-white",
};

const Summoner = () => {
  const [summonedHeroes, setSummonedHeroes] = useState<IHero[]>([]);

  const handleSummonOne = () => {
    const hero = summonHero();
    if (hero) setSummonedHeroes([hero]);
  };

  const handleSummonTen = () => {
    const heroes = summonMultipleHeroes(10);
    setSummonedHeroes(heroes);
  };

  const handleSummonHundred = () => {
    const heroes = summonMultipleHeroes(100);
    setSummonedHeroes(heroes);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-gray-800 text-white rounded-xl shadow-2xl overflow-hidden">
        {/* Tiêu đề */}
        <h2 className="text-3xl font-bold text-center py-6 bg-gradient-to-r from-gray-700 to-gray-900">
          Summon Heroes
        </h2>

        {/* Nút Triệu Hồi */}
        <div className="flex justify-center gap-6 py-6 bg-gray-800 border-t border-gray-700">
          <button
            onClick={handleSummonOne}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
          >
            Summon 1
          </button>
          <button
            onClick={handleSummonTen}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
          >
            Summon 10
          </button>
          <button
            onClick={handleSummonHundred}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
          >
            Summon 100
          </button>
        </div>

        {/* Danh sách tướng được triệu hồi */}
        <div className="p-6">
          {summonedHeroes.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No heroes summoned yet. Try your luck!
            </p>
          ) : summonedHeroes.length === 1 ? (
            // Khi triệu hồi 1 hero
            <div className="flex justify-center">
              <div
                className={`relative p-6 border-4 rounded-xl shadow-xl ${rarityColors[summonedHeroes[0].rarity]} transform transition-all duration-500 hover:scale-110`}
              >
                {/* Hiệu ứng ánh sáng xung quanh */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 animate-pulse rounded-xl"></div>
                <img
                  src={summonedHeroes[0].image}
                  alt={summonedHeroes[0].name}
                  className="w-32 h-32 object-cover rounded-lg mb-4 mx-auto"
                />
                <h3 className="text-xl font-bold text-center">{summonedHeroes[0].name}</h3>
                <p className="text-sm text-center">
                  Class: <span className="font-semibold">{summonedHeroes[0].class}</span>
                </p>
                <p className="text-sm text-center">
                  Rarity: <span className="font-semibold">{summonedHeroes[0].rarity}</span>
                </p>
                <p className="text-sm text-center">
                  Element: <span className="font-semibold">{summonedHeroes[0].element}</span>
                </p>
              </div>
            </div>
          ) : (
            // Khi triệu hồi nhiều hero (10 hoặc 100)
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {summonedHeroes.map((hero, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 rounded-lg shadow-lg ${rarityColors[hero.rarity]} transition transform hover:scale-105`}
                >
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold">{hero.name}</h3>
                  <p className="text-sm">
                    Class: <span className="font-bold">{hero.class}</span>
                  </p>
                  <p className="text-sm">
                    Rarity: <span className="font-bold">{hero.rarity}</span>
                  </p>
                  <p className="text-sm">
                    Element: <span className="font-bold">{hero.element}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summoner;