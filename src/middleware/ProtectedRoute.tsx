import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

interface ProtectedRouteProps {
  role: "admin" | "client";
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.role !== role) {
    return <Navigate to="/" />; // Chuyển hướng về trang chủ thay vì hiển thị thông báo
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;