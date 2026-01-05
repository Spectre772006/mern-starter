import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Home</h1>
      <p>You are logged in 🎉</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;