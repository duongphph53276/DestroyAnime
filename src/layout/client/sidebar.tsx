import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarClient = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({
    orders: false,
    profile: false,
  });

  const isActive = (path: string) =>
    location.pathname === path ? "bg-yellow-900 bg-opacity-50" : "hover:bg-gray-700";

  return (
    <div className="w-64 bg-gray-800 bg-opacity-90 shadow-lg p-4 h-full rounded-lg border border-gray-700">
      <ul className="space-y-2">
        {/* Trang chủ */}
        <li className={`p-3 rounded-md ${isActive("/")}`}>
          <Link to="/" className="block text-gray-200 font-medium">Trang chủ</Link>
        </li>

        {/* Hồ sơ */}
        <li className="relative">
          <button
            onClick={() => setDropdownOpen({ ...dropdownOpen, profile: !dropdownOpen.profile })}
            className={`w-full text-left p-3 rounded-md flex justify-between items-center text-gray-200 font-medium ${isActive("/profile")}`}
          >
            Hồ sơ <span>{dropdownOpen.profile ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.profile && (
            <ul className="absolute left-0 w-full bg-gray-900 shadow-md rounded-md mt-1 z-10 border border-gray-700">
              <li className="p-2 hover:bg-gray-800 text-gray-200">
                <Link to="/profile">Thông tin cá nhân</Link>
              </li>
              <li className="p-2 hover:bg-gray-800 text-gray-200">
                <Link to="/profile/edit">Chỉnh sửa hồ sơ</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Đơn hàng */}
        <li className="relative">
          <button
            onClick={() => setDropdownOpen({ ...dropdownOpen, orders: !dropdownOpen.orders })}
            className={`w-full text-left p-3 rounded-md flex justify-between items-center text-gray-200 font-medium ${isActive("/orders")}`}
          >
            Đơn hàng của tôi <span>{dropdownOpen.orders ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.orders && (
            <ul className="absolute left-0 w-full bg-gray-900 shadow-md rounded-md mt-1 z-10 border border-gray-700">
              <li className="p-2 hover:bg-gray-800 text-gray-200">
                <Link to="/orders">Danh sách đơn hàng</Link>
              </li>
              <li className="p-2 hover:bg-gray-800 text-gray-200">
                <Link to="/orders/new">Tạo đơn hàng mới</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SidebarClient;