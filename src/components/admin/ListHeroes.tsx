import React, { useEffect, useState } from "react";
import { IHero } from "../../interfaces/Hero";
import { Link } from "react-router-dom";

const ListHeroes: React.FC = () => {
  const [heroes, setHeroes] = useState<IHero[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/heroes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched heroes:", data);
        setHeroes(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error loading heroes:", error));
  }, []);
  

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Hero List
        </h1>
        <Link
          to="/admin/heroes/add"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          Add New Hero
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Class</th>
              <th className="py-2 px-4">Rarity</th>
              <th className="py-2 px-4">Element</th>
              <th className="py-2 px-4">HP</th>
              <th className="py-2 px-4">Attack</th>
              <th className="py-2 px-4">Defense</th>
              <th className="py-2 px-4">Speed</th>
              <th className="py-2 px-4">Crit Rate</th>
              <th className="py-2 px-4">Crit DMG</th>
              <th className="py-2 px-4">Lifesteal</th>
              <th className="py-2 px-4">Skills</th>
              <th className="py-2 px-4">Exclusive Skills</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {heroes.map((hero) => (
              <tr
                key={hero.id}
                className="border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="py-2 px-4 font-semibold">{hero.name}</td>
                <td>
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="py-2 px-4">{hero.description}</td>
                <td className="py-2 px-4">{hero.class}</td>
                <td className="py-2 px-4">{hero.rarity}</td>
                <td className="py-2 px-4">{hero.element}</td>
                <td className="py-2 px-4">{hero.hp}</td>
                <td className="py-2 px-4">{hero.attack}</td>
                <td className="py-2 px-4">{hero.defense}</td>
                <td className="py-2 px-4">{hero.speed}</td>
                <td className="py-2 px-4">{hero.critRate}%</td>
                <td className="py-2 px-4">{hero.critDamage}%</td>
                <td className="py-2 px-4">{hero.lifesteal}%</td>
                <td className="py-2 px-4">
                  {hero.skills.map((skill) => (
                    <div key={skill.id} className="text-sm">
                      {skill.name} ({skill.description})
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4">
                  {hero.exclusiveSkills?.map((skill) => (
                    <div key={skill.id} className="text-sm">
                      {skill.name} ({skill.description})
                    </div>
                  )) || "None"}
                </td>
                <td className="py-2 px-4">
                  <Link
                    to={`/admin/heroes/edit/${hero.id}`}
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

export default ListHeroes;