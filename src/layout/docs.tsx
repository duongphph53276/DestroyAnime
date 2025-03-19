import { Outlet } from "react-router-dom";
import HeaderClient from "./client/header"; // Tái sử dụng header từ ClientLayout
import FooterClient from "./client/footer"; // Tái sử dụng footer từ ClientLayout
import SidebarClient from "./client/sidebar"; // Tái sử dụng sidebar từ ClientLayout

const DocsLayout = () => {
  return (
    <main className="bg-gray-100 min-h-screen">
      <HeaderClient />
      <div className="flex gap-6 px-6 py-8 max-w-7xl mx-auto">
        <aside className="w-1/4">
          <SidebarClient />
        </aside>
        <section className="w-3/4 bg-white rounded-lg shadow-md p-6">
          <Outlet />
        </section>
      </div>
      <FooterClient />
    </main>
  );
};

export default DocsLayout;