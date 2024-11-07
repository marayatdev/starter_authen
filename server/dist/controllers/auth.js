"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_1 = require("../services/auth");
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor() {
        this.authService = new auth_1.AuthService();
        this.register = async (req, res, next) => {
            try {
                const { username, email, password } = req.body;
                const existingUser = await this.authService.checkEmail(email);
                if (existingUser) {
                    res.status(409).json({ message: "Email already exists" });
                    return;
                }
                const passwordHash = await argon2_1.default.hash(password);
                const response = await this.authService.register(username, email, passwordHash);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                const user = await this.authService.checkEmail(email);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                const valid = await argon2_1.default.verify(user.password, password);
                if (!valid) {
                    res.status(401).json({ message: "Invalid credentials" });
                    return;
                }
                const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username, role: user.role }, this.jwtSecret, { expiresIn: "1m" });
                const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id, }, this.refreshSecret, { expiresIn: "7d" }); // Refresh token expires in 7 days
                res.status(200).json({ accessToken, refreshToken });
            }
            catch (error) {
                next(error);
            }
        };
        this.refreshAccessToken = async (req, res, next) => {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith("Bearer ")) {
                    res.status(401).json({ message: "Token missing or invalid" });
                    return;
                }
                const refreshToken = authHeader.split(" ")[1];
                const decodedToken = jsonwebtoken_1.default.verify(refreshToken, this.refreshSecret);
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
                const newAccessToken = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username, role: user.role }, this.jwtSecret, { expiresIn: "1h" });
                res.status(200).json({ accessToken: newAccessToken });
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserMe = async (req, res, next) => {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith("Bearer ")) {
                    res.status(401).json({ message: "Token missing or invalid" });
                    return;
                }
                const token = authHeader.split(" ")[1];
                const decodedToken = jsonwebtoken_1.default.verify(token, this.jwtSecret);
                const user = await this.authService.getUserById(decodedToken.userId);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.jwtSecret = process.env.JWT_SECRET || 'default_secret';
        this.refreshSecret = process.env.REFRESH_SECRET || 'default_refresh_secret';
    }
}
exports.AuthController = AuthController;
