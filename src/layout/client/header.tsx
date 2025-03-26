import React from "react";
import { useAuth } from "../../middleware/useAuth";
import { useNavigate, Link } from "react-router-dom";

const HeaderClient = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg py-4 px-6 flex justify-between items-center border-b border-gray-700">
      {/* Logo và Tên Web */}
      <div className="flex items-center gap-4">
        <img
          src="https://api.deepai.org/job-view-file/a5987313-e820-411b-bb4e-483723d6de6f/outputs/output.jpg"
          alt="Logo"
          className="w-12 h-12 object-cover rounded-full shadow-md"
        />
        <h1 className="text-2xl font-bold text-yellow-400 tracking-wide">ANIME WAR</h1>
      </div>

      {/* User Info và Nút */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-300 font-medium">Xin chào, {user.username}</span>
            <img
              src={user.image}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
            />
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition shadow-md"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-md"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition shadow-md"
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderClient;