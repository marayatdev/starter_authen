"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = __importDefault(require("./config/prisma"));
const logger_1 = require("./utils/logger");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
class App {
    constructor() {
        this.port = Number(process.env.PORT) || 3000;
        this.app = (0, express_1.default)();
        this.setup();
    }
    setup() {
        this.configureMiddleware();
        this.initializeDatabase()
            .then(() => this.initializeRoutes())
            .then(() => this.startServer())
            .catch((error) => {
            (0, logger_1.logError)(`Setup failed: ${error.message}`);
            process.exit(1);
        });
    }
    configureMiddleware() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
    }
    async initializeDatabase() {
        try {
            await prisma_1.default.$connect();
            (0, logger_1.logInfo)("Connected to database");
        }
        catch (error) {
            throw new Error(`Database connection error: ${error}`);
        }
    }
    async initializeRoutes() {
        const routePath = path_1.default.resolve(__dirname, "routes");
        console.log(routePath);
        const directories = fs_1.default.readdirSync(routePath, { withFileTypes: true });
        for (const dir of directories) {
            if (dir.isDirectory()) {
                const folderPath = path_1.default.resolve(routePath, dir.name);
                const routeFiles = fs_1.default
                    .readdirSync(folderPath)
                    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
                for (const file of routeFiles) {
                    try {
                        const routeModule = await Promise.resolve(`${path_1.default.resolve(folderPath, file)}`).then(s => __importStar(require(s)));
                        console.log(dir.name);
                        if (routeModule.default) {
                            this.app.use(`/api/${dir.name}`, routeModule.default);
                        }
                    }
                    catch (error) {
                        console.error(`Error loading route module ${file} in ${dir.name}: ${error}`);
                    }
                }
            }
        }
    }
    startServer() {
        this.app.listen(this.port, () => {
            (0, logger_1.logInfo)(`🚀 Server is running on http://localhost:${this.port}`);
        });
    }
}
new App();
