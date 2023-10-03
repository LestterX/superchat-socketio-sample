import { serverHTTP } from "../server";
import { Server } from "socket.io";
import * as ChatProvider from '../ChatProvider'

const io = new Server(serverHTTP, {cors: {origin: ['*']}})

io.of('/').on('connection', (socket) => {
    console.log(`${socket.id} conectado`);
    
})