import 'reflect-metadata'
import express, { NextFunction, Request, Response, Express, Router } from "express";
import "express-async-errors";
import { DataSource } from 'typeorm';
import AppError from '../../errors/AppError';
import { IRoute } from '../routes/IRoute';
import { AbstractController } from '../../controller/AbstractController';

export class App {

    private app: Express;
    private routes: IRoute<AbstractController>[];
    private db: DataSource;

    constructor(app: Express, db: DataSource, routes: IRoute<AbstractController>[]) {
        this.app = app;
        this.db = db
        this.routes = routes
    }

    public setupRoute() {
        this.routes.forEach((route) => {
            route.setRouter(Router())
            route.setupRoutes();
            this.app.use(`/${route.getPrefixRoute()}`, route.getRoutes());
        });
    }

    public setupApp() {
        this.app.use(express.json());

        this.setupRoute();

        this.app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
            const serverStatusError = 500;
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({
                    status: "error",
                    message: error.message
                });
            }
            console.error(error);
            return response.status(serverStatusError).json({
                status: "error",
                message: "internal server error!"
            });
        });
    }

    public startApp() {
        this.runApp();
        this.connectDb();
    }

    public runApp() {
        this.setupApp();
        this.app.listen(3333, () => {
            console.log("Server start in host: http://localhost:3333/");
        })
    }
    public connectDb() {
        this.db.initialize().then(() => {
            console.log("Database connection complete");
        }).catch((error) => {
            console.error("Database connection failed: " + error)
        });
    }
}