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
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-yellow-600">Client Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-600">Xin chào, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
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