import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IHero } from "../../interfaces/Hero";

const HeroEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hero, setHero] = useState<IHero | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/heroes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setHero(data);
        setImagePreview(data.image); // Hiển thị ảnh hiện tại làm xem trước
      })
      .catch((error) => console.error("Error fetching hero:", error));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHero((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              ["hp", "attack", "defense", "speed", "critRate", "critDamage", "lifesteal"].includes(
                name
              )
                ? Number(value)
                : value,
          }
        : null
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setHero((prev) => (prev ? { ...prev, image: base64String } : null));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hero) return;

    try {
      const response = await fetch(`http://localhost:3000/heroes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      });

      if (!response.ok) {
        throw new Error("Failed to update hero");
      }

      navigate("/admin/heroes");
    } catch (error) {
      console.error("Error updating hero:", error);
      alert("Có lỗi xảy ra khi cập nhật hero!");
    }
  };

  if (!hero) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit Hero: {hero.name}
          </h1>
          <Link
            to="/admin/heroes"
            className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to List
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
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
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
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
                {["Water", "Fire", "Earth", "Wind", "Thunder", "Frost", "Light", "Dark"].map(
                  (elem) => (
                    <option key={elem} value={elem}>
                      {elem}
                    </option>
                  )
                )}
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
                {["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic", "???"].map(
                  (rarity) => (
                    <option key={rarity} value={rarity}>
                      {rarity}
                    </option>
                  )
                )}
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
              value={hero.description || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroEdit;