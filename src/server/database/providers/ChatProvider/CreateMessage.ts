import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { INewMessage } from "../../../models";

export const createMessage = async (newMessage: INewMessage) => {
    try {
        const message = await prisma.chat.update({
            where: {
                id: newMessage.chatId
            },
            data: {
                messages: {
                    create: {
                        message: newMessage.message
                    }
                }
            },
        })
        return message

    } catch (error) {
        console.log(error);        
        return new Error('Erro ao registrar mensagem')
    }

}