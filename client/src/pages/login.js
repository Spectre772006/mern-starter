import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      navigate("/home");
    } else {
      setError(data.message || "Login failed");
    }
  } catch (err) {
    console.error("FETCH ERROR:", err);
    setError("Cannot connect to server");
  }
};


  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Login</h2>

       {error && <p style={{ color: "red" }}>{error}</p>}

       <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
