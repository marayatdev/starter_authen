import { Router, Request, Response } from "express";
export class TestRoutes {

    public path: string = "/test";

    public router: Router = Router();


    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/gg`, (req, res) => {
            res.json({ message: "hello Test" })
        });
    }

}

export default new TestRoutes().router;