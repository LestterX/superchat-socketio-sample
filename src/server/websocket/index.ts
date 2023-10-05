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
    socket.on('join chat', async (chatId, userName, oldChat) => {
        const messages = await ChatProvider.getById(chatId)
        const chatName = await ChatProvider.getNameById(chatId)
        if (oldChat !== undefined && chatName) {
            console.log(oldChat, chatName.name);
            
            socket.leave(oldChat)
            socket.join(chatName.name)
            
            let join = true
            socket.broadcast.in(chatName.name).emit('user join leave chat', userName, join)

            join = false
            socket.broadcast.in(oldChat).emit('user join leave chat', userName, join)
        }
        socket.emit('join chat', messages, chatId, chatName)
    })
    
})
