// src/contexts/AuthContext.jsx
import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("ssp_user", null);

  const login = ({ fullName, email, password }) => {
    if (!fullName || !email || !password) {
      return false;
    }

    const newUser = {
      fullName: fullName.trim(),
      email: email.trim(),
      password: password, // store password for now (demo only)
    };

    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
