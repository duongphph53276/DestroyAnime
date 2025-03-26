import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IHero } from "../../interfaces/Hero";

const rarityStyles: { [key: string]: string } = {
  Common: "border-gray-400 bg-gray-200 text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200",
  Uncommon: "border-green-500 bg-green-200 text-green-800 dark:border-green-700 dark:bg-green-900 dark:text-green-200",
  Rare: "border-blue-500 bg-blue-200 text-blue-800 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-200",
  Epic: "border-purple-500 bg-purple-200 text-purple-800 dark:border-purple-700 dark:bg-purple-900 dark:text-purple-200",
  Legendary: "border-yellow-500 bg-yellow-200 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  Mythic: "border-red-500 bg-red-200 text-red-800 dark:border-red-700 dark:bg-red-900 dark:text-red-200",
  "???": "border-pink-500 bg-gradient-to-r from-pink-500 to-purple-500 text-white dark:from-pink-700 dark:to-purple-700",
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
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen transition-colors">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {hero.name} - Details
          </h1>
          <Link
            to="/admin/heroes"
            className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to List
          </Link>
        </div>
        <div className={`p-4 rounded-lg ${rarityStyles[hero.rarity]}`}>
          <img
            src={hero.image}
            alt={hero.name}
            className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>ID:</strong> {hero.id}</p>
            <p><strong>Name:</strong> {hero.name}</p>
            <p><strong>Class:</strong> {hero.class}</p>
            <p><strong>Element:</strong> {hero.element}</p>
            <p><strong>Rarity:</strong> {hero.rarity}</p>
            <p><strong>Description:</strong> {hero.description || "N/A"}</p>
            <p><strong>HP:</strong> {hero.hp}</p>
            <p><strong>Attack:</strong> {hero.attack}</p>
            <p><strong>Defense:</strong> {hero.defense}</p>
            <p><strong>Speed:</strong> {hero.speed}</p>
            <p><strong>Crit Rate:</strong> {hero.critRate}%</p>
            <p><strong>Crit Damage:</strong> {hero.critDamage}%</p>
            <p><strong>Lifesteal:</strong> {hero.lifesteal}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetail;