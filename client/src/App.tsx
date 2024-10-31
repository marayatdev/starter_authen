import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./contexts/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext";
import { NotFoundTitle } from "./pages/NotFound/NotFoundTitle";
import Dashboard from "./pages/Admin/Dashboard";
import Home from "./pages/Users/Home";
import { Login } from "./pages/Auth/SigniIn/Login";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Protected route for admin (role 1) */}
          <Route element={<ProtectedRoute requiredRole={1} />}>
            <Route path="/admin" element={<Dashboard />} />
          </Route>

          {/* Protected route for user (role 2) */}
          <Route element={<ProtectedRoute requiredRole={2} />}>
            <Route path="/user" element={<Home />} />
          </Route>

          {/* Catch-all route for 404 page */}
          <Route path="*" element={<NotFoundTitle />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
