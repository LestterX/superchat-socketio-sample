import { Request, Response } from "express"
import { ChatProvider } from "../../database/providers"
import { StatusCodes } from 'http-status-codes'

export const homeController = async (req: Request, res: Response) => {
    const chats = await ChatProvider.getAll()
    if (chats instanceof Error) return res.status(StatusCodes.BAD_REQUEST).json({ error: chats.message })

    return res.status(StatusCodes.OK).render('index', {
        chats: chats,
        room: 'Início',
        namespace: '/'
    })
}
