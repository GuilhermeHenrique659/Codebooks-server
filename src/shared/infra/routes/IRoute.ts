import { Router } from "express";

export interface IRoute<T> {
    setRouter(router: Router): void;
    getPrefixRoute(): string;
    setupRoutes(): void;
    getRoutes(): Router;
}