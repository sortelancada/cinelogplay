// Substituir require por import (arquivo com type: "module")
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "troque_essa_chave";

export function signToken(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h", ...options });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw err;
  }
}
