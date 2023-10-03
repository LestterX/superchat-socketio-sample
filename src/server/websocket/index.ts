import { Server } from "socket.io";
import { serverHTTP } from "../server";
import { ChatProvider } from "../database/providers";

const io = new Server(serverHTTP, {
    cors: {
        origin: ['*']
    },
})

io.on('connection', (socket) => {
    console.log(`${socket.id} conectado com sucesso`);
    socket.on('join chat', async (chatId) => {
        const messages = await ChatProvider.getById(chatId)
        const chatName = await ChatProvider.getNameById(chatId)
        console.log(messages);
        
        socket.emit('join chat', messages, chatId, chatName)
    })
    
})
