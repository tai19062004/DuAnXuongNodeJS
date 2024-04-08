import jwt from "jsonwebtoken";
export let verifyToken = (token) => jwt.verify(token, "bimatkhongbatmi");

export const generateToken = (payload, expiresIn = "2d") =>
  jwt.sign(payload, "bimatkhongbatmi", { expiresIn: expiresIn });