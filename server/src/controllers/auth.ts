import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth";
import { Register } from "../models/auth";
import { TypedRequestBody } from "../utils/request";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


export class AuthController {

    private authService = new AuthService();
    private jwtSecret: string;
    private refreshSecret: string;

    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'default_secret';
        this.refreshSecret = process.env.REFRESH_SECRET || 'default_refresh_secret';
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

            const accessToken = jwt.sign({ userId: user.id, username: user.username, role: user.role }, this.jwtSecret, { expiresIn: "1m" });
            const refreshToken = jwt.sign({ userId: user.id, }, this.refreshSecret, { expiresIn: "7d" }); // Refresh token expires in 7 days

            res.status(200).json({ accessToken, refreshToken });

        } catch (error) {
            next(error);
        }
    };


    public refreshAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {


            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                res.status(401).json({ message: "Token missing or invalid" });
                return;
            }



            const refreshToken = authHeader.split(" ")[1];
            const decodedToken = jwt.verify(refreshToken, this.refreshSecret) as jwt.JwtPayload;

            const user = await this.authService.getUserById(decodedToken.userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            // Optionally, validate the refresh token against what is stored in your database if implemented
            // const isValid = await this.authService.validateRefreshToken(user.id, refreshToken);
            // if (!isValid) {
            //     res.status(403).json({ message: "Invalid refresh token" });
            //     return;
            // }

            const newAccessToken = jwt.sign({ userId: user.id, username: user.username, role: user.role }, this.jwtSecret, { expiresIn: "1h" });
            res.status(200).json({ accessToken: newAccessToken });

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
