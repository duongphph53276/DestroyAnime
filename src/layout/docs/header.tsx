import React, { useState } from "react";

const HeaderDocs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        Game Docs
      </div>

      {/* Ô tìm kiếm */}
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Tìm kiếm thông tin game..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300">
          🔍
        </span>
      </div>

      {/* Không cần nút đăng xuất hay avatar */}
      <div className="text-gray-600 dark:text-gray-300">
        Hiểu Biết Game Hơn
      </div>
    </header>
  );
};

export default HeaderDocs;