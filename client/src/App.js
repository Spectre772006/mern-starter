import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/home" /> : <Login />
        }
      />

      <Route
        path="/home"
        element={
          isAuthenticated ? <Home /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;
