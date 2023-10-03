import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export const getById = async (pId: any) => {

    try {
        const chat = await prisma.chat.findFirst({
            where: {
                id: pId
            },
            select: {
                messages: true
            }
        })
        return chat
    } catch (error) {
        return new Error(`Erro ao pesquisar por ${pId}`)
    }

}