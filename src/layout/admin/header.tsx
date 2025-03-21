import React, { useState } from "react";
// import { useAuth } from "../../components/auth/AuthContext";

const HeaderAdmin = () => { 
  const [searchTerm, setSearchTerm] = useState("");
//   const { user, logout } = useAuth(); // Lấy user và logout từ AuthContext

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      {/* <div className="text-lg font-bold">{user?.username || "Docs"}</div> */}
      <h1>Duong</h1>

      {/* Ô tìm kiếm */}
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Chào Docs + Avatar + Nút Đăng xuất */}
      <div className="flex items-center gap-4">
        {/* <span className="text-gray-700 dark:text-gray-300">Welcome {user?.username || "Docs"}!</span> */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          {/* {user?.username?.charAt(0).toUpperCase() || "D"} */}
        </div>
        <button
        //   onClick={logout}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default HeaderAdmin;