import { Router } from "express";

export interface IRoute {
    setRouter(router: Router): void;
    getPrefixRoute(): string;
    setupRoutes(): void;
    getRoutes(): Router;
}