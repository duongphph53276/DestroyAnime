import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IHero } from "../../interfaces/Hero";
import { RarityType } from "../../interfaces/Rarity";
import { HeroClass } from "../../interfaces/HeroClass";
import { ElementGame } from "../../interfaces/Elements";

const HeroAdd: React.FC = () => {
  const navigate = useNavigate();
  const [hero, setHero] = useState<Partial<IHero>>({
    name: "",
    description: "",
    class: "Tanker",
    rarity: "Common",
    element: "Water",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    critRate: 0,
    critDamage: 0,
    lifesteal: 0,
    skills: [],
    image: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setHero((prev) => ({
      ...prev,
      [name]:
        ["hp", "attack", "defense", "speed", "critRate", "critDamage", "lifesteal"].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setHero((prev) => ({ ...prev, image: base64String }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/heroes");
      const heroes: IHero[] = await response.json();
      const newId = heroes.length > 0 ? Math.max(...heroes.map((h) => h.id)) + 1 : 1;

      const newHero: IHero = {
        id: newId,
        name: hero.name || "",
        description: hero.description || "",
        class: hero.class as HeroClass,
        rarity: hero.rarity as RarityType,
        element: hero.element as ElementGame,
        hp: hero.hp || 0,
        attack: hero.attack || 0,
        defense: hero.defense || 0,
        speed: hero.speed || 0,
        critRate: hero.critRate || 0,
        critDamage: hero.critDamage || 0,
        lifesteal: hero.lifesteal || 0,
        rage: 100,
        skills: hero.skills || [],
        image: hero.image || "",
      };

      const postResponse = await fetch("http://localhost:3000/heroes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHero),
      });

      if (!postResponse.ok) {
        throw new Error("Failed to add hero");
      }

      navigate("/admin/heroes");
    } catch (error) {
      console.error("Error adding hero:", error);
      alert("Có lỗi xảy ra khi thêm hero!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add New Hero
        </h1>
        <Link
          to="/admin/heroes"
          className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200">Name</label>
            <input
              type="text"
              name="name"
              value={hero.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Class</label>
            <select
              name="class"
              value={hero.class}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {["Tanker", "Assassin", "Fighter", "Healer", "Mage", "Archer"].map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Rarity</label>
            <select
              name="rarity"
              value={hero.rarity}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic", "???"].map((rarity) => (
                <option key={rarity} value={rarity}>{rarity}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Element</label>
            <select
              name="element"
              value={hero.element}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {["Water", "Fire", "Earth", "Wind", "Thunder", "Frost", "Light", "Dark"].map((elem) => (
                <option key={elem} value={elem}>{elem}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">HP</label>
            <input
              type="number"
              name="hp"
              value={hero.hp}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Attack</label>
            <input
              type="number"
              name="attack"
              value={hero.attack}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Defense</label>
            <input
              type="number"
              name="defense"
              value={hero.defense}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Speed</label>
            <input
              type="number"
              name="speed"
              value={hero.speed}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Crit Rate (%)</label>
            <input
              type="number"
              name="critRate"
              value={hero.critRate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Crit Damage (%)</label>
            <input
              type="number"
              name="critDamage"
              value={hero.critDamage}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Lifesteal (%)</label>
            <input
              type="number"
              name="lifesteal"
              value={hero.lifesteal}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            name="description"
            value={hero.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Add Hero
        </button>
      </form>
    </div>
  );
};

export default HeroAdd;