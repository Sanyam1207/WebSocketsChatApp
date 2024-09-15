const WebSocket = require("ws")
const express = require("express")
const path = require("path");
const { execArgv } = require("process");

const app = express();

app.use("/", express.static(path.resolve(__dirname, '../client')))
const server = app.listen(9876)

const wss = new WebSocket.Server({
    noServer, //Start a websocket server listening at the given port
    // verifyClient:  function(info) {
    //     // const user = getExpressSession(info)
    //     console.log(info);
    // }

})

wss.on('connection', function (ws) {
    ws.on("message", function (data) {
        wss.clients.forEach((client) => {
            if  (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }

        })
    })
})

server.on('upgrade', async function upgrade(request, socket, head){
    // let args;
    // try {
    //     args = await getDataAsync()
    // } catch (error) {
    //     socket.destroy()
    //     return
    // }

    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request, args)
    })
})

// console.log(wss);
