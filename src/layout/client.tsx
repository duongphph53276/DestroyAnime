import { Outlet } from "react-router-dom";
import HeaderClient from "./client/header";
import FooterClient from "./client/footer";
import SidebarClient from "./client/sidebar";

const ClientLayout = () => {
  return (
    <main className="bg-white">
        <HeaderClient/>
        <div className="flex gap-4 pb-4">
            <SidebarClient/>
            <div className="border content w-4/5 p-4">
                <Outlet/>
            </div>
        </div>
        <FooterClient/>
    </main>
  );
};

export default ClientLayout;