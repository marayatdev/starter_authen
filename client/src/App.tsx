import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./contexts/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext";
import { NotFoundTitle } from "./pages/NotFound/NotFoundTitle";
import Dashboard from "./pages/Admin/Dashboard";
import Home from "./pages/User/Home";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute requiredRole={1} />}>
            <Route path="/admin" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute requiredRole={2} />}>
            <Route path="/user" element={<Home />} />
          </Route>

          <Route path="*" element={<NotFoundTitle />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
