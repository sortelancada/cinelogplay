// Detecta o IP da rede automaticamente
function getAPIUrl() {
  const hostname = window.location.hostname;
  const port = "3001";

  // Se está em localhost, usa localhost
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return `http://localhost:${port}`;
  }

  // Se está em rede interna, usa o mesmo IP
  return `http://${hostname}:${port}`;
}

export const API_BASE_URL = import.meta.env.VITE_API_URL || getAPIUrl();

export const config = {
  apiUrl: API_BASE_URL,
  timeout: 5000,
};

export const API_URL = API_BASE_URL;
export const USE_MOCK = false;

console.log("🔌 API_URL:", API_URL);
