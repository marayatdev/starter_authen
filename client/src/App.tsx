import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute, { PublicRoute } from "./contexts/ProtectedRoute";
import { NotFoundTitle } from "./pages/NotFound/NotFoundTitle";
import { Login } from "./pages/Auth/SigniIn/Login";
import Home from "./pages/Home/Home";
import routes from "./Routes/routes-config";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundTitle />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<Home />} />

        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path || ""}
            element={
              route.requireRoles ? (
                <ProtectRoute requireRoles={route.requireRoles}>
                  <route.element />{" "}
                </ProtectRoute>
              ) : (
                <route.element />
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
