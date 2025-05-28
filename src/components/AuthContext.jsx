import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  const login = (token, role, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);
    setRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setRole(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(!!(localStorage.getItem("token") || sessionStorage.getItem("token")));
    setRole(localStorage.getItem("role") || null);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
