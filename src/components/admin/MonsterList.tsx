import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const MonsterList: React.FC = () => {
  const [monsters, setMonsters] = useState<IMonster[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/monsters")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched monsters:", data);
        setMonsters(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error loading monsters:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Monster List
        </h1>
        <Link
          to="/admin/monsters/add"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          Add New Monster
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Class</th>
              <th className="py-2 px-4">Element</th>
              <th className="py-2 px-4">Rarity</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {monsters.map((monster) => (
              <tr
                key={monster.id}
                className={`border-b border-opacity-50 transition-colors ${
                  rarityStyles[monster.rarity] || "border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                } hover:bg-opacity-80`}
              >
                <td className="py-2 px-4">{monster.id}</td>
                <td className="py-2 px-4 font-semibold">
                  <Link to={`/admin/monsters/${monster.id}`} className="hover:underline">
                    {monster.name}
                  </Link>
                </td>
                <td>
                  <img
                    src={monster.image}
                    alt={monster.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="py-2 px-4">{monster.class}</td>
                <td className="py-2 px-4">{monster.element}</td>
                <td className="py-2 px-4">{monster.rarity}</td>
                <td className="py-2 px-4">
                  <Link
                    to={`/admin/monsters/edit/${monster.id}`}
                    className="text-blue-500 hover:underline dark:text-blue-400"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonsterList;