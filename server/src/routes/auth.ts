import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth";
import authenticateToken from "../middlewares/auth";
export class AuthRoutes {

    public path: string = "/auth";

    public router: Router = Router();

    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.authController.register);
        this.router.post(`${this.path}/login`, this.authController.login);
        this.router.get(`${this.path}/getUserMe`, authenticateToken, this.authController.getUserMe);
    }

}

export default new AuthRoutes().router;