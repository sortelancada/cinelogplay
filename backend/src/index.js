// ============================================
// CONFIGURAÇÃO DO CORS
// ============================================
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://192.168.1.206:5173",
    "http://192.168.1.206:5174",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
