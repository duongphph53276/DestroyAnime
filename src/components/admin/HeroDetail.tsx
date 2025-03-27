import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IHero } from "../../interfaces/Hero";

const rarityStyles: { [key: string]: string } = {
  Common: "border-gray-400 bg-gray-100 text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 shadow-md",
  Uncommon: "border-green-500 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950 dark:text-green-200 shadow-md",
  Rare: "border-blue-500 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-200 shadow-md",
  Epic: "border-purple-500 bg-purple-50 text-purple-900 dark:border-purple-700 dark:bg-purple-950 dark:text-purple-200 shadow-md",
  Legendary: "border-yellow-500 bg-yellow-50 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-200 shadow-md",
  Mythic: "border-red-500 bg-red-50 text-red-900 dark:border-red-700 dark:bg-red-950 dark:text-red-200 shadow-md",
  "???": "border-pink-500 bg-gradient-to-r from-pink-500 to-purple-500 text-white dark:from-pink-700 dark:to-purple-700 shadow-lg",
};

const HeroDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hero, setHero] = useState<IHero | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/heroes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setHero(data))
      .catch((error) => console.error("Error fetching hero:", error));
  }, [id]);

  if (!hero) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-950 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
        <div className="flex justify-between items-center p-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {hero.name} <span className="text-gray-500 text-lg">— Hero Details</span>
          </h1>
          <Link
            to="/admin/heroes"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 shadow-sm"
          >
            Back to List
          </Link>
        </div>
        <div className={`p-6 rounded-b-xl ${rarityStyles[hero.rarity]}`}>
          <div className="flex flex-col items-center mb-6">
            <img
              src={hero.image}
              alt={hero.name}
              className="w-40 h-40 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg transform transition-transform hover:scale-105 duration-300"
            />
            <p className="mt-4 text-lg font-semibold italic text-center">
              {hero.description || "A mysterious hero with untold powers."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">ID:</strong> {hero.id}
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">Name:</strong> {hero.name}
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">Class:</strong> {hero.class}
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">Element:</strong> {hero.element}
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">Rarity:</strong> {hero.rarity}
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">HP:</strong> {hero.hp || "N/A"}
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">Attack:</strong> {hero.attack || "N/A"}
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">Defense:</strong> {hero.defense || "N/A"}
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">Speed:</strong> {hero.speed || "N/A"}
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">Crit Rate:</strong> {hero.critRate ? `${hero.critRate}%` : "N/A"}
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">Crit Damage:</strong> {hero.critDamage ? `${hero.critDamage}%` : "N/A"}
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <strong className="text-gray-700 dark:text-gray-300">Lifesteal:</strong> {hero.lifesteal ? `${hero.lifesteal}%` : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetail;