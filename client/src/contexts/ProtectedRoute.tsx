import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireRoles?: number[];
}

const ProtectedRoute = ({
  children,
  requireRoles = [],
}: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const isAuthen = !!token;

  if (!isAuthen) {
    return <Navigate to="/" replace />;
  }

  const decodedToken: { role?: number } = jwtDecode(token || "");

  const matchRoles =
    !requireRoles.length || requireRoles.includes(Number(decodedToken.role)!);

  if (!matchRoles) {
    return <Navigate to="/404" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
