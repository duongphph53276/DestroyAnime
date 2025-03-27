import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserGame } from "../../interfaces/UserGame";
import { IHero } from "../../interfaces/Hero";
import { IItem } from "../../interfaces/Item";
import { Iuser } from "../../interfaces/user";

const Profile: React.FC = () => {
  const [userGame, setUserGame] = useState<UserGame | null>(null);
  const [allHeroes, setAllHeroes] = useState<IHero[]>([]);
  const [allItems, setAllItems] = useState<IItem[]>([]);
  const [userInfo, setUserInfo] = useState<Iuser | null>(null);

  const currentUserId = parseInt(localStorage.getItem("userId") || "1", 10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userGameRes, userRes, heroesRes, itemsRes] = await Promise.all([
          axios.get(`http://localhost:3000/userGames?userId=${currentUserId}`),
          axios.get(`http://localhost:3000/users/${currentUserId}`),
          axios.get("http://localhost:3000/heroes"),
          axios.get("http://localhost:3000/items"),
        ]);

        if (userGameRes.data.length > 0) {
          setUserGame(userGameRes.data[0]);
        } else {
          console.error(`No userGame found for userId: ${currentUserId}`);
        }

        setUserInfo(userRes.data);
        setAllHeroes(heroesRes.data);
        setAllItems(itemsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUserId]);

  if (!userGame || !allHeroes.length || !allItems.length || !userInfo) {
    return (
      <div className="p-6 text-center text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  const ownedHeroes: IHero[] = Array.isArray(userGame.heroes) && typeof userGame.heroes[0] === "number"
    ? userGame.heroes.map((heroId) =>
        allHeroes.find((hero) => hero.id === heroId)
      ).filter(Boolean) as IHero[]
    : userGame.heroes as IHero[];

  const ownedItems = Array.isArray(userGame.items) && "id" in userGame.items[0] && "quantity" in userGame.items[0]
    ? userGame.items.map((item) => ({
        ...allItems.find((i) => i.id === item.id),
        quantity: item.quantity,
      })).filter(Boolean) as (IItem & { quantity: number })[]
    : userGame.items.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      })) as (IItem & { quantity: number })[];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Hồ Sơ Người Chơi
        </h1>

        {/* Thông tin cơ bản */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Người chơi {userInfo.username}
            <br /> 
            <p> Bạn là người chơi thứ :
            {userGame.userId}
            </p>
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Cấp độ:</strong> {userGame.level}
          </p>
        </div>

        {/* Tài nguyên */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Tài Nguyên
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-200 dark:bg-gray-600 rounded-lg text-center">
              <p className="text-gray-800 dark:text-gray-200 font-bold">Bạc</p>
              <p className="text-gray-700 dark:text-gray-300">{userGame.resources.silver}</p>
            </div>
            <div className="p-4 bg-yellow-200 dark:bg-yellow-900 rounded-lg text-center">
              <p className="text-yellow-800 dark:text-yellow-200 font-bold">Vàng</p>
              <p className="text-yellow-700 dark:text-yellow-300">{userGame.resources.gold}</p>
            </div>
            <div className="p-4 bg-blue-200 dark:bg-blue-900 rounded-lg text-center">
              <p className="text-blue-800 dark:text-blue-200 font-bold">Kim cương</p>
              <p className="text-blue-700 dark:text-blue-300">{userGame.resources.diamond}</p>
            </div>
          </div>
        </div>

        {/* Heroes */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Heroes Sở Hữu ({ownedHeroes.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ownedHeroes.map((hero) => (
              <div key={hero.id} className="p-4 bg-gray-100 dark:bg-gray-600 rounded-lg text-center">
                <img src={hero.image} alt={hero.name} className="w-24 h-24 object-cover rounded-full mx-auto mb-2" />
                <p className="text-gray-800 dark:text-gray-200 font-bold">{hero.name}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  {hero.class} - {hero.rarity} - {hero.element}
                </p>
                {hero.hp && hero.attack && hero.defense && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    HP: {hero.hp} | ATK: {hero.attack} | DEF: {hero.defense}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Vật phẩm */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Vật Phẩm ({ownedItems.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ownedItems.map((item) => (
              <div key={item.id} className="p-4 bg-gray-100 dark:bg-gray-600 rounded-lg text-center">
                <p className="text-gray-800 dark:text-gray-200 font-bold">{item.name}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Loại: {item.type} | Độ hiếm: {item.rarity} | Số lượng: {item.quantity}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                {item.expirationDate && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Hết hạn: {new Date(item.expirationDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
