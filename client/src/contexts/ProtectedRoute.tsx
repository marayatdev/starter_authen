import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireRoles?: number[];
}

const ProtectedRoute = ({
  children,
  requireRoles = [],
}: ProtectedRouteProps) => {
  const userRole = localStorage.getItem("userRole");
  const isAuthen = !!localStorage.getItem("isAuth");

  if (!isAuthen) {
    return <Navigate to="/" replace />;
  }

  const matchRoles =
    !requireRoles.length || requireRoles.includes(Number(userRole));
  if (!matchRoles) {
    return <Navigate to="/404" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
