import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: { userId: string; username: string; role: string };
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token missing or invalid" });
        return;
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET || 'default_secret';

    try {
        const decodedToken = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
        req.user = { userId: decodedToken.userId, username: decodedToken.username, role: decodedToken.role };
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }
};

export default authenticateToken;
