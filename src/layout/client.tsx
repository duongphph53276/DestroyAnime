import { Outlet } from "react-router-dom";
import HeaderClient from "./client/header";
import FooterClient from "./client/footer";
import SidebarClient from "./client/sidebar";

const ClientLayout = () => {
  return (
    <main className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col text-white">
      <HeaderClient />
      <div className="flex flex-1 gap-6 p-6 max-w-7xl mx-auto w-full">
        {/* Sidebar với chiều rộng cố định */}
        <div className="w-64 flex-shrink-0">
          <SidebarClient />
        </div>
        {/* Nội dung chính */}
        <div className="flex-1 bg-gray-800 bg-opacity-90 rounded-lg shadow-xl p-6 min-w-0 border border-gray-700">
          <Outlet />
        </div>
      </div>
      <FooterClient />
    </main>
  );
};

export default ClientLayout;