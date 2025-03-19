import { Outlet } from "react-router-dom";
import SidebarAdmin from "./admin/sidebar";
import { useEffect, useState } from "react";
import HeaderAdmin from "./admin/header";
import FooterAdmin from "./admin/footer";

const AdminLayout = () => {
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
    <main className="bg-white dark:bg-gray-900 dark:text-white min-h-screen">
        <HeaderAdmin/>
      <div className="flex gap-4 pb-4">
        <SidebarAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="border content w-4/5 p-4 dark:border-gray-700">
          <Outlet />
        </div>
      </div>
      <FooterAdmin/>
    </main>
  );
};

export default AdminLayout;
