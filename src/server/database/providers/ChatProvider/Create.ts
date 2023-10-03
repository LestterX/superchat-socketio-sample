import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

interface IChat {
    nome: string,
    role: string,
}

export const create = async (chat: IChat) => {

    try {
        const newChat = await prisma.chat.create({
            data: {
                name: chat.nome,
                role: chat.role,
            },
            select: {
                id: true
            }
        })
        return newChat
    } catch (error) {
        return new Error('Erro, grupo já existe')
    }

}