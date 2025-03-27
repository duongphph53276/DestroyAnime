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

  const toggleDropdown = (key: string) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className={`w-full h-full p-4 border-r transition-all ${
        darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 p-2 w-full text-center rounded-md border transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <ul className="space-y-2">
        {/* Dashboard */}
        <li>
          <Link
            to="/admin"
            className="block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Dashboard
          </Link>
        </li>

        {/* Quản lý anh hùng */}
        <li className="relative">
          <button
            onClick={() => toggleDropdown("heroes")}
            className="w-full text-left p-3 rounded-md flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Quản lý anh hùng <span>{dropdownOpen.heroes ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.heroes && (
            <ul className="ml-4 border-l border-gray-300 dark:border-gray-600 pl-2 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/heroes"
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Danh sách
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/heroes/add"
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Thêm mới
                </Link>
              </li>
            </ul>
          )}
        </li>


        {/* Quản lý quái vật */}
        <li className="relative">
          <button
            onClick={() => toggleDropdown("monsters")}
            className="w-full text-left p-3 rounded-md flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Quản lý quái vật <span>{dropdownOpen.monsters ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.monsters && (
            <ul className="ml-4 border-l border-gray-300 dark:border-gray-600 pl-2 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/monsters"
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Danh sách
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/monsters/add"
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
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
            className="block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Quản lý chức năng
          </Link>
        </li>

        {/* Quản lý danh mục */}
        <li className="relative">
          <button
            onClick={() => toggleDropdown("category")}
            className="w-full text-left p-3 rounded-md flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Quản lý danh mục <span>{dropdownOpen.category ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.category && (
            <ul className="ml-4 border-l border-gray-300 dark:border-gray-600 pl-2 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/category"
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Danh sách
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/addcategory"
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Thêm mới
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Quản lý người dùng */}
        <li className="relative">
          <button
            onClick={() => toggleDropdown("users")}
            className="w-full text-left p-3 rounded-md flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Quản lý người dùng <span>{dropdownOpen.users ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.users && (
            <ul className="ml-4 border-l border-gray-300 dark:border-gray-600 pl-2 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/users"
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Danh sách
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/addusers"
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
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