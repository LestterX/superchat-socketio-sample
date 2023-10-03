import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { createProvider, getByRoleProvider, getAllProvider } from "./ChatProvider";

const routes = Router();

routes.get('/', (req, res) => {
    res.status(StatusCodes.OK).json({
        message: 'home page',
    })
})
routes.get('/chat/:role', async (req, res) => {
    const role = req.params.role.toLowerCase()
    const chats = await getByRoleProvider.getByRole(role)
    console.log(chats);
    res.status(StatusCodes.OK).json(chats)
})
routes.get('/chat', async (req, res) => {
    const chats = await getAllProvider.getAll(Number(req.query.limit), Number(req.query.page))
    if(chats instanceof Error) return res.status(StatusCodes.BAD_REQUEST).json({error: chats.message})
    return res.status(StatusCodes.OK).json({chats})
})
routes.post('/chat', async (req, res) => {
    const chatData = req.body
    console.log(chatData);
    const chat = await createProvider.create(chatData)
    console.log(chat);
    if (chat instanceof Error) return res.status(StatusCodes.BAD_REQUEST).json({error: chat.message})
    res.status(StatusCodes.CREATED).json(chat)
})

export { routes }