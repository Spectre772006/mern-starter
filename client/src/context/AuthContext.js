import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    setToken(savedToken);
  }
}, []);


  const login = (userData, authToken) => {
  setUser(userData);
  setToken(authToken);
  localStorage.setItem("token", authToken);
};


 const logout = () => {
  setUser(null);
  setToken(null);
  localStorage.removeItem("token");
};

  const isAuthenticated = !!token || !!localStorage.getItem("token");


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
