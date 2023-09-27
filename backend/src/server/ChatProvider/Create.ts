import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const create = async (chat: any) => {

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