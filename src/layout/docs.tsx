import { Outlet } from "react-router-dom"
import HeaderDocs from "./docs/header"
import SidebarDocs from "./docs/sidebar"
import FooterDocs from "./docs/footer"

const DocsLayout = () => {
  return (
    <main className="bg-white">
        <HeaderDocs/>
        <div className="flex gap-4 pb-4">
            <SidebarDocs/>
            <div className="border content w-4/5 p-4">
                <Outlet/>
            </div>
        </div>
        <FooterDocs/>
    </main>
  )
}

export default DocsLayout