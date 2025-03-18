import { Outlet } from "react-router-dom"
import HeaderAdmin from "./admin/header"
import SidebarAdmin from "./admin/sidebar"
import FooterAdmin from "./admin/footer"

const AdminLayout = () => {
  return (
    <main className="bg-white">
        <HeaderAdmin/>
        <div className="flex gap-4 pb-4">
            <SidebarAdmin/>
            <div className="border content w-4/5 p-4">
                <Outlet/>
            </div>
        </div>
        <FooterAdmin/>
    </main>
  )
}

export default AdminLayout