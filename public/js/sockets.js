const socket = io()
const joinChat = document.querySelector('.join-chat')
let chatNameTop = document.querySelector('.topBar').children[0]

const goToChat = (chatId) => {
    let userName = document.querySelector('.userName')
    if (userName.value.length < 1) userName.value = 'Anônimo '
    let oldChat = chatNameTop.textContent
    if (chatNameTop.textContent === '') oldChat = undefined
    socket.emit('join chat', chatId, userName.value, oldChat)
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
    let msg = document.createElement('p')
    msg.innerHTML = `<i><b>Você entrou no grupo</b></i>`
    msgSection.appendChild(msg)
    console.log(messages.messages);
})
socket.on('user join leave chat', (userName, join) => {
    const msgSection = document.querySelector('.messages')
    let userJoinChat = document.createElement('p')
    let joinLeaveMsg = `<i><b>${userName} entrou no grupo</b></i>`
    if (!join) {
        joinLeaveMsg = `<i><b>${userName} saiu do grupo</b></i>`
    }
    userJoinChat.innerHTML = joinLeaveMsg
    msgSection.appendChild(userJoinChat)
})