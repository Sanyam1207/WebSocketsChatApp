const server = new WebSocket('ws://127.0.0.1:9876/websocket');
const message = document.getElementById("messages")
const input = document.getElementById("message")
const button = document.getElementById("send")

button.disabled = true
button.addEventListener('click', sendMessage,  false);


server.onopen = function (){
    button.disabled = false
}

server.onmessage = function (event) {
    const { data } = event
    const newMessage = document.createElement("div")
    // console.log(event);
    newMessage.innerText = `Server Says ${data}`
    message.appendChild(newMessage)

}

function sendMessage() {
    const text = input.value
    server.send(text)
    input.value = ''
}

// button.addEventListener('click', () => {
//     console.log(userInput.value);
    
//     ws.send(userInput.value)
// })