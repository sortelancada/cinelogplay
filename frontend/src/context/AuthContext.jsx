import { createContext, useContext, useState, useCallback } from "react";
import { authService } from "../services/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getStoredUser());

  const login = useCallback(async (email, senha) => {
    const usuario = await authService.login(email, senha);
    setUser(usuario);
    return usuario;
  }, []);

  const register = useCallback(async (nome, email, senha) => {
    const usuario = await authService.register(nome, email, senha);
    setUser(usuario);
    return usuario;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
