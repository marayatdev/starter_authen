import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./contexts/ProtectedRoute";
import { NotFoundTitle } from "./pages/NotFound/NotFoundTitle";
import UserPage from "./pages/Users/UserPage";
import { Login } from "./pages/Auth/SigniIn/Login";
import AdminDashboard from "./pages/Admin/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundTitle />} />
        <Route path="/" element={<Login />} />

        <Route path="/users" element={<ProtectRoute requireRoles={["1"]} />}>
          <Route path="" element={<UserPage />} />
        </Route>

        <Route path="/admin" element={<ProtectRoute requireRoles={["2"]} />}>
          <Route path="" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
