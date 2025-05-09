import { Outlet } from "react-router-dom";
import SidebarAdmin from "./admin/sidebar";
import { useEffect, useState } from "react";
import HeaderAdmin from "./admin/header";
import FooterAdmin from "./admin/footer";
import { useAuth } from "../middleware/useAuth"; // Giả định đường dẫn đúng

const AdminLayout = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-gray-900 dark:text-white">
      <HeaderAdmin />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar cố định */}
        <div className="w-64 flex-shrink-0">
          <SidebarAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        {/* Nội dung chính */}
        <div className="flex-1 p-4 overflow-y-auto border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <Outlet context={{ darkMode }} /> {/* Truyền darkMode qua context */}
        </div>
      </div>
      <FooterAdmin />
    </main>
  );
};

export default AdminLayout;