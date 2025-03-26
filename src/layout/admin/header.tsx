import React, { useState } from "react";
import { useAuth } from "../../middleware/useAuth";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-3 flex items-center justify-between">
      <div className="text-lg font-bold text-gray-900 dark:text-white">
        {user?.username ? `Admin - ${user.username}` : "Admin Dashboard"}
      </div>

      <div className="relative w-80">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 dark:text-gray-300">
          Welcome {user?.username || "Admin"}!
        </span>
        <img
          src={user?.image}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default HeaderAdmin;