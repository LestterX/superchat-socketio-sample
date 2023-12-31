import { Server } from "socket.io";
import { serverHTTP } from "../server";
import { ChatProvider } from "../database/providers";
import { INewMessage } from "../models";

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
    socket.on('create message', async (chatId, message, join_leave) => {
        if (!message) message = '<i>Mensagem em inválida</i>'
        const newMessage: INewMessage = { chatId, message }
        console.log(`-----------${newMessage.chatId}------------`);
        if (newMessage.chatId) {
            let messageResult = await ChatProvider.createMessage(newMessage)
            console.log(messageResult);
        }
        console.log('Envio message 1');
        const chatName = await ChatProvider.getNameById(chatId)
        console.log('Envio message 2');
        console.log(chatName);
        if (chatName && !join_leave) {
            socket.broadcast.in(chatName.name).emit('create message', message)
            console.log('Envio message 3');
        }
        console.log('Envio message 4');
        console.log(message);

    })
})

io.of('/manager').on('connection', (socket) => {
    console.log('Manager');
    socket.on('games namespace', (msg) => {
        console.log(msg + '1');
        io.of('/games').emit('namespace notification', msg)
    })
    socket.on('geral namespace', (msg) => {
        console.log(msg + '2');
        io.of('/geral').emit('namespace notification', msg)
    })
    socket.on('tecnologia namespace', (msg) => {
        console.log(msg + '3');
        io.of('/tecnology').emit('namespace notification', msg)
    })

})

io.of('/games').on('connection', (socket) => {
    console.log('games');
})

io.of('/tecnology').on('connection', (socket) => {
    console.log('tecnology');
})

io.of('/geral').on('connection', (socket) => {
    console.log('geral');
})