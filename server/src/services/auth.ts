import { PrismaClient } from "@prisma/client";
import logger, { logDebug, logError } from "../utils/logger";
import { Register } from "../models/auth";

export class AuthService {
    private prisma = new PrismaClient();

    public async checkEmail(email: string) {
        return this.prisma.users.findUnique({
            where: {
                email
            }
        })
    }

    public async register(username: string, email: string, password: string): Promise<Register> {
        return this.prisma.users.create({
            data: {
                username,
                email,
                password
            }
        })
    }

    public async getUserById(id: number) {
        return this.prisma.users.findUnique({
            where: {
                id
            }
        })
    }


}