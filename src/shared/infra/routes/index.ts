import { userRoute } from "../../../modules/user/infra/http/routes/user.route";
import { AbstractController } from "../../controller/AbstractController";
import { IRoute } from "./IRoute";


export const routesList: IRoute<AbstractController>[] = [
    userRoute
]
