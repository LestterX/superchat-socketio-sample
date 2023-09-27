const newChatModal = document.querySelector('.newChatModal')

const displayFlexNone = ['flex', 'none']
let newChat_count = 0;

document.addEventListener('click', (e) => {
    if (e.target.className === 'newChatBnt' ||
        e.target.className === 'closeNewChatBnt' ||
        e.target.clasName === 'newChatBntName'
    ) {
        newChat_changeDisplay()
    }
})

function newChat_changeDisplay() {
    newChatModal.style.display = displayFlexNone[newChat_count]
    newChat_count++
    if (newChat_count > 1) newChat_count = 0
}