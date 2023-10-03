import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export const getByRole = async (pRole: any): Promise<Error | Object> => {

    try {
        const chats = await prisma.chat.findMany({
            where: {
                role: pRole
            },
            include: {
                messages: true
            }
        })
        return chats
    } catch (error) {
        return new Error(`Erro ao pesquisar por ${pRole}`)
    }

}