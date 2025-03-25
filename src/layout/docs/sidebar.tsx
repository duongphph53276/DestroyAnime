import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

const SidebarDocs = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 shadow-lg p-4">
      <button
        onClick={toggleDarkMode}
        className="w-full p-3 mb-4 rounded-lg font-bold border hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <ul className="space-y-4">
        <li>
          <Link
            to="/docs"
            className="block p-3 rounded-lg font-bold bg-blue-500 text-white text-center hover:bg-blue-600 transition-colors"
          >
            Giới thiệu Game
          </Link>
        </li>

        {/* Hệ thống Heroes */}
        <li>
          <button
            onClick={() => toggleDropdown("rarity")}
            className="flex items-center justify-between w-full p-3 rounded-lg font-bold border hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
          >
            Về Heroes{" "}
            {openDropdown === "rarity" ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
          {openDropdown === "rarity" && (
            <ul className="mt-2 space-y-2 pl-4">
              <li>
                <Link
                  to="/docs/rarity"
                  className="block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Thông tin Rarity
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/element"
                  className="block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Các nguyên tố
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/class"
                  className="block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Các vai trò
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Hướng dẫn chơi */}
        <li>
          <button
            onClick={() => toggleDropdown("guides")}
            className="flex items-center justify-between w-full p-3 rounded-lg font-bold border hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
          >
            Hướng dẫn chơi{" "}
            {openDropdown === "guides" ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
          {openDropdown === "guides" && (
            <ul className="mt-2 space-y-2 pl-4">
              <li>
                <a
                  href="/docs/guides/beginner"
                  className="block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Người mới bắt đầu
                </a>
              </li>
              <li>
                <a
                  href="/docs/guides/advanced"
                  className="block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Nâng cao
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* FAQ */}
        <li>
          <Link
            to="/docs/faq"
            className="block p-3 rounded-lg font-bold border hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
          >
            FAQ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarDocs;