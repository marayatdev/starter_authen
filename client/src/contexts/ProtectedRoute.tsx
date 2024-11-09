import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireRoles?: number[];
}

const ProtectedRoute = ({ children, requireRoles = [] }: ProtectedRouteProps) => {
  const token = localStorage.getItem("accessToken");
  const isAuthen = !!token;

  if (!isAuthen) {
    return <Navigate to="/" replace />;
  }

  const decodedToken: { role?: number } = jwtDecode(token || "");
  const matchRoles = !requireRoles.length || requireRoles.includes(Number(decodedToken.role)!);

  if (!matchRoles) {
    return <Navigate to="/404" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

// PublicRoute component to handle pages like /login for unauthenticated users only
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("accessToken");
  const isAuthen = !!token;

  if (isAuthen) {
    return <Navigate to="/" replace />; // Redirect to home if already authenticated
  }

  return children ? children : <Outlet />;
};

export { PublicRoute };
