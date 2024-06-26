import { Express } from "express";
import { AuthController } from "../controllers/Auth.controllers";
import validToken from "../middleware/auth.jwt.middleware";
import validate from "../requests/auth.request";
const user = new AuthController();

export function AuthUserRoutes(app: Express) {
  app.post("/api/register",validate('register'), user.register);
  app.post("/api/login",validate('login'), user.login);
  app.post("/api/logout", validToken, user.logOut);
}
