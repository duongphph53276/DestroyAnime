import { Outlet } from "react-router-dom";
import HeaderClient from "./client/header";
import FooterClient from "./client/footer";
import SidebarClient from "./client/sidebar";

const ClientLayout = () => {
  return (
    <main className="bg-gray-100 min-h-screen flex flex-col">
      <HeaderClient />
      <div className="flex flex-1 gap-6 p-6 max-w-7xl mx-auto">
        <SidebarClient />
        <div className="w-4/5 bg-white rounded-lg shadow-md p-6">
          <Outlet />
        </div>
      </div>
      <FooterClient />
    </main>
  );
};

export default ClientLayout;