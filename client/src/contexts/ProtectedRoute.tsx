import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireRoles?: string[];
}

const ProtectRoute = ({ children, requireRoles = [] }: ProtectedRouteProps) => {
  const userRole = sessionStorage.getItem("userRole");
  const isAuthen = !!sessionStorage.getItem("isAuth");

  if (!isAuthen) {
    return <Navigate to="/" replace />;
  }

  const matchRoles =
    !requireRoles.length || requireRoles.includes(userRole as string);
  if (!matchRoles) {
    return <Navigate to="/404" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectRoute;
