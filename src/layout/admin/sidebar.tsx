import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarAdmin = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({
    products: false,
    category: false,
    users: false,
  });

  const isActive = (path: string) => location.pathname.includes(path) ? "bg-gray-200" : "hover:bg-gray-100";

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4">
      <ul className="space-y-2">
        {/* Dashboard */}
        <li className={`p-3 rounded-md ${isActive("/admin")}`}>
          <Link to="/admin" className="block">Dashboard</Link>
        </li>

        {/* Quản lý sản phẩm */}
        <li className="relative">
          <button
            onClick={() => setDropdownOpen({ ...dropdownOpen, products: !dropdownOpen.products })}
            className={`w-full text-left p-3 rounded-md flex justify-between items-center ${isActive("/admin/products")}`}
          >
            Quản lý sản phẩm <span>{dropdownOpen.products ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.products && (
            <ul className="absolute left-0 w-full bg-white shadow-md rounded-md mt-1 z-10">
              <li className="p-2 hover:bg-gray-200">
                <Link to="/admin/products">Danh sách</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link to="/admin/addproducts">Thêm mới</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Quản lý đơn hàng */}
        <li className={`p-3 rounded-md ${isActive("/admin/orders")}`}>
          <Link to="/admin/orders" className="block">Quản lý đơn hàng</Link>
        </li>

        {/* Quản lý danh mục */}
        <li className="relative">
          <button
            onClick={() => setDropdownOpen({ ...dropdownOpen, category: !dropdownOpen.category })}
            className={`w-full text-left p-3 rounded-md flex justify-between items-center ${isActive("/admin/category")}`}
          >
            Quản lý danh mục <span>{dropdownOpen.category ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.category && (
            <ul className="absolute left-0 w-full bg-white shadow-md rounded-md mt-1 z-10">
              <li className="p-2 hover:bg-gray-200">
                <Link to="/admin/category">Danh sách</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link to="/admin/addcategory">Thêm mới</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Quản lý người dùng */}
        <li className="relative">
          <button
            onClick={() => setDropdownOpen({ ...dropdownOpen, users: !dropdownOpen.users })}
            className={`w-full text-left p-3 rounded-md flex justify-between items-center ${isActive("/admin/users")}`}
          >
            Quản lý người dùng <span>{dropdownOpen.users ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen.users && (
            <ul className="absolute left-0 w-full bg-white shadow-md rounded-md mt-1 z-10">
              <li className="p-2 hover:bg-gray-200">
                <Link to="/admin/users">Danh sách</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link to="/admin/addusers">Thêm mới</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
