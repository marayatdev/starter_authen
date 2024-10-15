import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext";

interface ProtectedRouteProps {
  requiredRole: number; // role that is allowed to access
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { role } = useUser();

  if (role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
