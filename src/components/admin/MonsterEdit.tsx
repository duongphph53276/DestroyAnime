import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMonster } from "../../interfaces/Monster";

const MonsterEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [monster, setMonster] = useState<IMonster | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/monsters/${id}`)
      .then((response) => response.json())
      .then((data) => setMonster(data))
      .catch((error) => console.error("Error fetching monster:", error));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMonster((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!monster) return;

    fetch(`http://localhost:3000/monsters/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(monster),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update monster");
        return response.json();
      })
      .then(() => navigate("/admin/monsters"))
      .catch((error) => console.error("Error updating monster:", error));
  };

  if (!monster) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen transition-colors">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Edit Monster: {monster.name}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Name</label>
          <input
            type="text"
            name="name"
            value={monster.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            name="description"
            value={monster.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Rarity</label>
          <select
            name="rarity"
            value={monster.rarity}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Epic">Epic</option>
            <option value="Legend">Legend</option>
            <option value="Mythic">Mythic</option>
            <option value="Boss">Boss</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Element</label>
          <select
            name="element"
            value={monster.element}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Earth">Earth</option>
            <option value="Fire">Fire</option>
            <option value="Frost">Frost</option>
            <option value="Thunder">Thunder</option>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
            <option value="Wind">Wind</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Class</label>
          <select
            name="class"
            value={monster.class}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Fighter">Fighter</option>
            <option value="Assassin">Assassin</option>
            <option value="Archer">Archer</option>
            <option value="Tanker">Tanker</option>
            <option value="Healer">Healer</option>
            <option value="Mage">Mage</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">HP</label>
          <input
            type="number"
            name="hp"
            value={monster.hp}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Attack</label>
          <input
            type="number"
            name="attack"
            value={monster.attack}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Defense</label>
          <input
            type="number"
            name="defense"
            value={monster.defense}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Speed</label>
          <input
            type="number"
            name="speed"
            value={monster.speed}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Crit Rate (%)</label>
          <input
            type="number"
            name="critRate"
            value={monster.critRate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Crit Damage (%)</label>
          <input
            type="number"
            name="critDamage"
            value={monster.critDamage}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Lifesteal (%)</label>
          <input
            type="number"
            name="lifesteal"
            value={monster.lifesteal}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Image URL</label>
          <input
            type="text"
            name="image"
            value={monster.image}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          Update Monster
        </button>
      </form>
    </div>
  );
};

export default MonsterEdit;