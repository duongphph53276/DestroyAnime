import { useState, useEffect } from "react";
import axios from "axios";
import { summonHero, summonMultipleHeroes } from "../../utils/gachaSystem";
import { IHero } from "../../interfaces/Hero";
import { UserGame } from "../../interfaces/UserGame";

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
  const [userGame, setUserGame] = useState<UserGame | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const currentUserId = parseInt(localStorage.getItem("userId") || "1", 10);

  useEffect(() => {
    const fetchUserGame = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/userGames?userId=${currentUserId}`);
        if (response.data.length > 0) {
          setUserGame(response.data[0]);
        } else {
          console.error(`No userGame found for userId: ${currentUserId}`);
        }
      } catch (error) {
        console.error("Error fetching user game:", error);
      }
    };
    fetchUserGame();
  }, [currentUserId]);

  const updateResources = async (goldCost: number) => {
    if (!userGame) return;

    const updatedUserGame = {
      ...userGame,
      resources: {
        ...userGame.resources,
        gold: userGame.resources.gold - goldCost,
      },
    };

    try {
      const response = await axios.patch(
        `http://localhost:3000/userGames/${currentUserId}`,
        updatedUserGame,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUserGame(response.data);
    } catch (error) {
      console.error("Error updating resources:", error);
    }
  };

  const handleSummonOne = async () => {
    if (!userGame || userGame.resources.gold < 200) {
      setErrorMessage("Bạn không đủ vàng để tiếp tục gacha tướng!");
      setSummonedHeroes([]);
      return;
    }

    const hero = summonHero();
    if (hero) {
      console.log("Summoned hero:", hero);
      setSummonedHeroes([hero]);
      await updateResources(200);
      setErrorMessage("");
    }
  };

  const handleSummonTen = async () => {
    if (!userGame || userGame.resources.gold < 2000) {
      setErrorMessage("Bạn không đủ vàng để tiếp tục gacha tướng!");
      setSummonedHeroes([]);
      return;
    }

    const heroes = summonMultipleHeroes(10);
    console.log("Summoned 10 heroes:", heroes);
    setSummonedHeroes(heroes);
    await updateResources(2000);
    setErrorMessage("");
  };

  const handleSummonHundred = async () => {
    if (!userGame || userGame.resources.gold < 20000) {
      setErrorMessage("Bạn không đủ vàng để tiếp tục gacha tướng!");
      setSummonedHeroes([]);
      return;
    }

    const heroes = summonMultipleHeroes(100);
    console.log("Summoned 100 heroes:", heroes);
    setSummonedHeroes(heroes);
    await updateResources(20000);
    setErrorMessage("");
  };

  if (!userGame) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-gray-800 text-white rounded-xl shadow-2xl overflow-hidden">
        <h2 className="text-3xl font-bold text-center py-6 bg-gradient-to-r from-gray-700 to-gray-900">
          Summon Heroes
        </h2>

        <div className="flex justify-center gap-6 py-4 bg-gray-800 border-t border-gray-700">
          <div className="text-center">
            <p className="text-gray-400">Bạc</p>
            <p className="text-xl font-bold">{userGame.resources.silver}</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-400">Vàng</p>
            <p className="text-xl font-bold">{userGame.resources.gold}</p>
          </div>
          <div className="text-center">
            <p className="text-blue-400">Kim cương</p>
            <p className="text-xl font-bold">{userGame.resources.diamond}</p>
          </div>
        </div>

        <div className="flex justify-center gap-6 py-6 bg-gray-800 border-t border-gray-700">
          <button
            type="button"
            onClick={handleSummonOne}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
          >
            Summon 1 (200 vàng)
          </button>
          <button
            type="button"
            onClick={handleSummonTen}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
          >
            Summon 10 (2000 vàng)
          </button>
          <button
            type="button"
            onClick={handleSummonHundred}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
          >
            Summon 100 (20000 vàng)
          </button>
        </div>

        {errorMessage && (
          <p className="text-center text-red-500 py-4">{errorMessage}</p>
        )}

        <div className="p-6">
          {summonedHeroes.length === 0 && !errorMessage ? (
            <p className="text-center text-gray-400 text-lg">
              No heroes summoned yet. Try your luck!
            </p>
          ) : summonedHeroes.length === 1 ? (
            <div className="flex justify-center">
              <div
                className={`relative p-6 border-4 rounded-xl shadow-xl ${rarityColors[summonedHeroes[0].rarity]} transform transition-all duration-500 hover:scale-110`}
              >
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