"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRoutes = void 0;
const express_1 = require("express");
class TestRoutes {
    constructor() {
        this.path = "/test";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/gg`, (req, res) => {
            res.json({ message: "hello Test" });
        });
    }
}
exports.TestRoutes = TestRoutes;
exports.default = new TestRoutes().router;
