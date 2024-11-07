"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = __importDefault(require("../middlewares/auth"));
class AuthRoutes {
    constructor() {
        this.path = "/auth2";
        this.router = (0, express_1.Router)();
        this.authController = new auth_1.AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.authController.register);
        this.router.post(`${this.path}/login`, this.authController.login);
        this.router.post(`${this.path}/refresh-token`, auth_2.default, this.authController.refreshAccessToken);
        this.router.get(`${this.path}/me`, auth_2.default, this.authController.getUserMe);
        this.router.get(`${this.path}/gg`, (req, res) => {
            res.json({ message: "hello" });
        });
    }
}
exports.AuthRoutes = AuthRoutes;
exports.default = new AuthRoutes().router;
