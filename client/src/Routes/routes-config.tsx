import Menu1 from "./pages/Menu1";
import Menu2 from "./pages/Menu2";
import Home from "./pages/Home";

export default [
  {
    index: true,
    element: Home,
  },
  {
    path: "menu1",
    element: Menu1,
    requireRoles: ["R01", "R02"],
  },
  {
    path: "menu2",
    element: Menu2,
    requireRoles: ["R02"],
  },
];
