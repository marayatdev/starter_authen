import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth";
import { Register } from "../models/auth";
import { TypedRequestBody } from "../utils/request";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


export class AuthController {

    private authService = new AuthService();
    private jwtSecret: string;

    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'default_secret';
    }

    public register = async (req: TypedRequestBody<{ username: string, email: string, password: string }>, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username, email, password } = req.body;

            const existingUser = await this.authService.checkEmail(email);

            if (existingUser) {
                res.status(409).json({ message: "Email already exists" });
                return;
            }

            const passwordHash = await argon2.hash(password);

            const response = await this.authService.register(username, email, passwordHash);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    public login = async (req: TypedRequestBody<{ email: string, password: string }>, res: Response, next: NextFunction): Promise<void> => {
        try {

            const { email, password } = req.body;

            const user = await this.authService.checkEmail(email);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            const valid = await argon2.verify(user.password, password);
            if (!valid) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }

            const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, this.jwtSecret, { expiresIn: "1h" });
            res.status(200).json({ token, role: user.role });

        } catch (error) {
            next(error);
        }
    };

    public getUserMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                res.status(401).json({ message: "Token missing or invalid" });
                return;
            }
            const token = authHeader.split(" ")[1];
            const decodedToken = jwt.verify(token, this.jwtSecret) as jwt.JwtPayload;

            const user = await this.authService.getUserById(decodedToken.userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);

        } catch (error) {
            next(error);
        }
    };



}
