"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
class AuthService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async checkEmail(email) {
        return this.prisma.users.findUnique({
            where: {
                email
            }
        });
    }
    async register(username, email, password) {
        return this.prisma.users.create({
            data: {
                username,
                email,
                password
            }
        });
    }
    async getUserById(id) {
        return this.prisma.users.findUnique({
            where: {
                id
            }
        });
    }
}
exports.AuthService = AuthService;
