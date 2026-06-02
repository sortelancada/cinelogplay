import { api } from "./api.js";

export const authService = {
  async login(email, senha) {
    const res = await api.post("/api/auth/login", { email, senha });
    const { token, usuario } = res.data ?? res;
    localStorage.setItem("clp_token", token);
    localStorage.setItem("clp_user", JSON.stringify(usuario));
    return usuario;
  },

  async register(nome, email, senha) {
    const res = await api.post("/api/auth/register", { nome, email, senha });
    const { token, usuario } = res.data ?? res;
    localStorage.setItem("clp_token", token);
    localStorage.setItem("clp_user", JSON.stringify(usuario));
    return usuario;
  },

  logout() {
    localStorage.removeItem("clp_token");
    localStorage.removeItem("clp_user");
  },

  getStoredUser() {
    try {
      const raw = localStorage.getItem("clp_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem("clp_token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("clp_token");
  },
};
