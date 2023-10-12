import { ChatController } from "./controllers";
import { Router } from "express";

const routes = Router();

routes.get('/', ChatController.homeController)
routes.get('/games', ChatController.gamesController)
routes.get('/tecnology', ChatController.tecnologyController)
routes.get('/geral', ChatController.geralController)


export { routes }