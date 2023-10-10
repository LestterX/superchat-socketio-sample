const socket = io()
const joinChat = document.querySelector('.join-chat')
let chatNameTop = document.querySelector('.topBar').children[0]
const sendBnt = document.querySelector('.send')

const goToChat = (chatId) => {
    let userName = document.querySelector('.userName')
    if (userName.value.length < 1) userName.value = 'Anônimo '
    let oldChat = chatNameTop.textContent
    if (chatNameTop.textContent === '') oldChat = undefined
    socket.emit('join chat', chatId, userName.value, oldChat)
}
const createGroupBouble = (groupName, chatId = undefined) => {
    let chat = document.createElement('div')
    chat.classList.add('chat')

    let chatName = document.createElement('div')
    chatName.classList.add('chatName')
    chatName.textContent = groupName
    chat.appendChild(chatName)

    let joinChat = document.createElement('button')
    joinChat.classList.add('join-chat')
    joinChat.textContent = 'Entre'
    joinChat.addEventListener('click', () => goToChat(chatId))
    chat.appendChild(joinChat)

    return chat
}
// let chats = document.querySelector('.chats')
// chats.appendChild(createGroupBouble('testeeeeeeeeaaa'))


const messageInput = document.querySelector('#message')
messageInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') evtCreateMessage()
})
sendBnt.addEventListener('click', (e) => {
    e.preventDefault()
    evtCreateMessage()
})

const evtCreateMessage = () => {
    let userName = document.querySelector('.userName')
    if (userName.value.length < 1) userName.value = 'Anônimo'
    const messageInput = document.querySelector('#message')
    if(messageInput.value === '') {
        return alert('Digite uma mensagem')
    }
    let message = `<b>${userName.value}:</b> ${messageInput.value}`
    let chatId = chatNameTop.className
    socket.emit('create message', chatId, message)
    addMessageSection(message)
    messageInput.value = ''
}
const addMessageSection = (message) => {
    const msgSection = document.querySelector('.messages')
    let msg = document.createElement('p')
    msg.innerHTML = message
    msgSection.appendChild(msg)
}



socket.on('create message', message => {
    addMessageSection(message)
})

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
    let chatId = chatNameTop.className
    socket.emit('create message', chatId, joinLeaveMsg, true)
    userJoinChat.innerHTML = joinLeaveMsg
    msgSection.appendChild(userJoinChat)
})

