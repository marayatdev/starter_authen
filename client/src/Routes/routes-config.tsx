// import Home from "../pages/Home/Home";
import AdminDashboard from "../pages/Admin/Dashboard";
import UserPage from "../pages/Users/UserPage";
import { Login } from "../pages/Auth/SigniIn/Login";

export default [
  {
    index: true,
    element: Login,
  },
  {
    path: "/users",
    element: UserPage,
    requireRoles: [1],
  },
  {
    path: "/admin",
    element: AdminDashboard,
    requireRoles: [2],
  },
];
