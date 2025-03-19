import { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarAdminProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarAdmin = ({ darkMode, setDarkMode }: SidebarAdminProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({
    products: false,
    category: false,
    users: false,
  });

  return (
    <div className={`w-64 h-screen p-4 border-r transition-all ${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"}`}>
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 p-2 w-full text-center rounded-md border transition hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <ul className="space-y-2">
        {/* Dashboard */}
        <li>
          <Link
            to="/admin"
            className="block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Dashboard
          </Link>
        </li>

        {/* Quản lý sản phẩm */}
        <li className="relative">
          <button
            onClick={() => setDropdownOpen({ ...dropdownOpen, products: !dropdownOpen.products })}
            className="w-full text-left p-3 rounded-md flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Quản lý sản phẩm <span>{dropdownOpen.products ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.products && (
            <ul className="ml-4 border-l border-gray-300 dark:border-gray-600 pl-2 mt-1 space-y-1">
              <li>
                <Link to="/admin/products" className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Danh sách
                </Link>
              </li>
              <li>
                <Link to="/admin/addproducts" className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Thêm mới
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Quản lý đơn hàng */}
        <li>
          <Link
            to="/admin/orders"
            className="block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Quản lý đơn hàng
          </Link>
        </li>

        {/* Quản lý danh mục */}
        <li className="relative">
          <button
            onClick={() => setDropdownOpen({ ...dropdownOpen, category: !dropdownOpen.category })}
            className="w-full text-left p-3 rounded-md flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Quản lý danh mục <span>{dropdownOpen.category ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.category && (
            <ul className="ml-4 border-l border-gray-300 dark:border-gray-600 pl-2 mt-1 space-y-1">
              <li>
                <Link to="/admin/category" className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Danh sách
                </Link>
              </li>
              <li>
                <Link to="/admin/addcategory" className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Thêm mới
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Quản lý người dùng */}
        <li className="relative">
          <button
            onClick={() => setDropdownOpen({ ...dropdownOpen, users: !dropdownOpen.users })}
            className="w-full text-left p-3 rounded-md flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Quản lý người dùng <span>{dropdownOpen.users ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.users && (
            <ul className="ml-4 border-l border-gray-300 dark:border-gray-600 pl-2 mt-1 space-y-1">
              <li>
                <Link to="/admin/users" className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Danh sách
                </Link>
              </li>
              <li>
                <Link to="/admin/addusers" className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Thêm mới
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
