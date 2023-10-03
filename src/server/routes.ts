import { ChatController } from "./controllers";
import { Router } from "express";

const routes = Router();

routes.get('/', ChatController.homeController)


export { routes }