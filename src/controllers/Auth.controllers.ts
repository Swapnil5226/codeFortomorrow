import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthRepo } from "../repository/auth.repo";
import { validationResult } from "express-validator";

const authService = new AuthService(new AuthRepo());

export class AuthController {
  constructor() {}
  async register(req: Request, res: Response) {
    const arg = await authService.register(req.body);
    return res.status(arg.status).json(arg);
  }

  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const arg = await authService.logIn(req.body, res);
    return res.status(arg.status).json(arg);
  }

  async logOut(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const id = req.body?.user?.id;
    const arg = await authService.logOut(id, req, res);
    return res.status(arg.status).json(arg);
  }
}
