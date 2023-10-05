import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface INewMessage { // CHAMAR DO MODELS
    chatName: string
    message: string
}

export const create = (newMessage: INewMessage) => {

}