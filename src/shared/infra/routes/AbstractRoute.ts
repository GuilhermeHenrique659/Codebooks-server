import { Router } from "express";
import { ExpressAdapter } from "../../adapter/ExpressAdapter";
import { AbstractController } from "../../controller/AbstractController";
import { AuthenticateMiddleware } from "../../middleware/AuthenticationMiddleware";
import { ValidationMiddleware } from "../../middleware/ValidationMiddleware";
import { AbstractValidation } from "../../validation/AbstractValidation";
import { IRouteMethod } from "./IRoutesMethod";


export abstract class AbstractRoute<
    C extends AbstractController,
    V extends AbstractValidation | undefined = undefined
>
{
    private controller: C

    private validationMiddleware: ValidationMiddleware<V>;

    protected abstract RouteMethods: IRouteMethod<C, V>

    private router: Router;

    constructor(controller: C, private validation?: new () => V) {
        this.controller = controller
        this.validationMiddleware = new ValidationMiddleware(validation);
    }

    public setRouter(router: Router) {
        this.router = router;
    }

    public getRoutes(): Router {
        return this.router;
    }

    public getPrefixRoute(): string {
        return this.RouteMethods.prefix;
    }

    public setupRoutes(): void {
        this.RouteMethods.routesConfig.forEach((routeMethod) => {
            console.log(`[${routeMethod.method}] - Inicializer routes ${this.RouteMethods.prefix} - controller ${routeMethod.controller as string}`);
            this.router[routeMethod.method](
                routeMethod.url,
                AuthenticateMiddleware.isAutheticated(routeMethod.authentication),
                this.validationMiddleware.executeValidate(routeMethod.validation),
                ExpressAdapter.RouterAdapter(this.controller, routeMethod.controller)
            );
        })
    }
}