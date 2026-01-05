import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
  const isLoggedIn = false; // temporary

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
