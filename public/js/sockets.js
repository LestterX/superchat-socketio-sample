const socket = io()
const joinChat = document.querySelector('.join-chat')
const userName = document.querySelector('.userName')
let chatNameTop = document.querySelector('.topBar').children[0]

const goToChat = (chatId) => {
    console.log(chatId);
    socket.emit('join chat', chatId)
}
socket.on('join chat', (messages, chatId, chatName) => {
    const msgSection = document.querySelector('.messages')
    msgSection.innerHTML = ''
    chatNameTop.className = chatId
    chatNameTop.textContent = chatName.name
    messages.messages.forEach(el => {
        console.log(el.message);
        let msg = document.createElement('p')
        msg.innerHTML = el.message
        msgSection.appendChild(msg)
    })
    console.log(messages.messages);
})