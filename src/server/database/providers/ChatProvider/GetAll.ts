import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAll = async (limit: number = 10, page: number = 1): Promise<Error | Object> => {
    
    try {
        const allChats = await prisma.chat.findMany({
            skip: 0,
            take: 10,
            include: {messages: true}
        })
        console.log(allChats);
        
        return allChats
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registros')
    }

}