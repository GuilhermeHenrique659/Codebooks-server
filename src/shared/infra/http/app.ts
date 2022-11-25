import 'reflect-metadata'
import express, { NextFunction, Request, Response, Express, Router } from "express";
import fileupload from 'express-fileupload'
import "express-async-errors";
import AppError from '../../errors/AppError';
import { IRoute } from '../routes/IRoute';
import { AbstractController } from '../../controller/AbstractController';
import cors from 'cors'
import uploadConfig from './../../../config/upload';
import { DataBase } from '../database';

export class App {

    private app: Express;
    private routes: IRoute<AbstractController>[];
    private db: DataBase;

    constructor(app: Express, db: DataBase, routes: IRoute<AbstractController>[]) {
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
        const allowedOrigins = ['http://localhost:3000', 'http://192.168.0.103:3000'];

        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };

        this.app.use(fileupload())

        this.app.use("/files", express.static(uploadConfig.directory))

        this.app.use(cors(options));

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
        this.connectDb();
        this.runApp();
    }

    public runApp() {
        this.setupApp();
        this.app.listen(3333, () => {
            console.log("Server start in host: http://localhost:3333/");
        })
    }
    public connectDb() {
        this.db.startDbConnectiom()
    }
}