"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token missing or invalid" });
        return;
    }
    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET || 'default_secret';
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = { userId: decodedToken.userId, username: decodedToken.username, role: decodedToken.role };
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }
};
exports.default = authenticateToken;
