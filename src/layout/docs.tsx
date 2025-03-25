import { Outlet } from "react-router-dom";
import HeaderDocs from "./docs/header";
import SidebarDocs from "./docs/sidebar";
import FooterDocs from "./docs/footer";

const DocsLayout = () => {
  return (
    <main className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <HeaderDocs />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 flex-shrink-0">
          <SidebarDocs />
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-800 shadow-inner">
          <Outlet />
        </div>
      </div>
      <FooterDocs />
    </main>
  );
};

export default DocsLayout;