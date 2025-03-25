import "./App.css";
import "./index.css";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Welcome from "./components/Welcome";
import AdminLayout from "./layout/admin";
import Dashboard from "./components/admin/Dashboard";
import ListHeroes from "./components/admin/HeroList";
import Summoner from "./components/client/Summoner";
import Login from "./middleware/Login";
import ClientLayout from "./layout/client";
import Register from "./middleware/Register";
import DocsLayout from "./layout/docs";
import ElementInformation from './components/docs/ElementInfomation';
import RarityInformation from "./components/docs/RarityInformation";
import AboutGame from "./components/docs/AboutGame";
import ClassInformation from "./components/docs/ClassInformation";
import RegisterAdmin from "./middleware/RegisterAdmin";
import UserList from "./components/admin/UserList";
import UserEdit from "./components/admin/UserEdit";

function AppRoutes() {
  return useRoutes([
    { path: "/register", element: <Register /> },
    { path: "/im_admin_and_fck_you__DevbyDuong", element: <RegisterAdmin /> },
    { path: "/login", element: <Login /> },
    {
      path: "/admin",
      element: (
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Dashboard /> },
        { path: "heroes", element: <ListHeroes /> },
        { path: "users", element:<UserList/>},
        { path: "users/:id", element: <UserEdit /> }
      ],
    },
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        { path: "", element: <Welcome /> },
        { path: "summon", element: <Summoner /> },
      ],
    },
    {
      path: "/docs",
      element: <DocsLayout />,
      children: [
        { path: "", element: <AboutGame /> },
        { path: "rarity", element: <RarityInformation /> },
        { path: "element", element: <ElementInformation /> },
        { path: "class", element: <ClassInformation /> },
      ],
    },
  ]);
}

function App() {
  return <AppRoutes />;
}

export default App;