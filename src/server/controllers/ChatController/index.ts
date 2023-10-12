import * as homeController from './Home'
import * as gamesController from './Games'
import * as geralController from './Geral'
import * as tecnologyController from './Tecnology'

export const ChatController = {
    ...homeController,
    ...gamesController,
    ...geralController,
    ...tecnologyController
}