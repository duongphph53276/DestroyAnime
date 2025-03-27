import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IMonster } from "../../interfaces/Monster";

const rarityStyles: { [key: string]: string } = {
  Common: "border-gray-400 bg-gray-200 text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200",
  Uncommon: "border-green-500 bg-green-200 text-green-800 dark:border-green-700 dark:bg-green-900 dark:text-green-200",
  Rare: "border-blue-500 bg-blue-200 text-blue-800 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-200",
  Epic: "border-purple-500 bg-purple-200 text-purple-800 dark:border-purple-700 dark:bg-purple-900 dark:text-purple-200",
  Legend: "border-yellow-500 bg-yellow-200 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  Mythic: "border-red-500 bg-red-200 text-red-800 dark:border-red-700 dark:bg-red-900 dark:text-red-200",
  Boss: "border-pink-500 bg-gradient-to-r from-pink-500 to-purple-500 text-white dark:from-pink-700 dark:to-purple-700",
};

const MonsterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [monster, setMonster] = useState<IMonster | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/monsters/${id}`)
      .then((response) => response.json())
      .then((data) => setMonster(data))
      .catch((error) => console.error("Error fetching monster:", error));
  }, [id]);

  if (!monster) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Monster Details: {monster.name}
        </h1>
        <Link
          to="/admin/monsters"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          Back to List
        </Link>
      </div>
      <div className={`p-4 border rounded-lg ${rarityStyles[monster.rarity]}`}>
        <div className="flex items-center space-x-4">
          <img
            src={monster.image}
            alt={monster.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-xl font-semibold">{monster.name}</h2>
            <p>{monster.description}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <p><strong>Rarity:</strong> {monster.rarity}</p>
          <p><strong>Element:</strong> {monster.element}</p>
          <p><strong>Class:</strong> {monster.class}</p>
          <p><strong>HP:</strong> {monster.hp}</p>
          <p><strong>Attack:</strong> {monster.attack}</p>
          <p><strong>Defense:</strong> {monster.defense}</p>
          <p><strong>Speed:</strong> {monster.speed}</p>
          <p><strong>Crit Rate:</strong> {monster.critRate}%</p>
          <p><strong>Crit Damage:</strong> {monster.critDamage}%</p>
          <p><strong>Lifesteal:</strong> {monster.lifesteal}%</p>
        </div>
        {monster.exclusiveSkills && monster.exclusiveSkills.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Exclusive Skills</h3>
            <ul className="list-disc list-inside">
              {monster.exclusiveSkills.map((skill) => (
                <li key={skill.id}>
                  {skill.name}: {skill.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonsterDetail;