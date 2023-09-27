import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const getByRole = async (pRole: any): Promise<Error | Object> => {

    const chats = await prisma.chat.findMany({
        where: {
            role: pRole
        },
        include: {
            messages: true
        }
    })
    return chats

}