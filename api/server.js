const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET","POST","PUT","DELETE"],
    }
})

io.on("connection", (socket) => {
    socket.on("light_bulb_state_to_server", (data) => {
        console.log("here")
        socket.broadcast.emit("light_bulb_state_to_client", data)
    })
    // socket.on("light_bulb_state_to_server_from_joseph", (data) => {
    //     socket.broadcast.emit("light_bulb_state_to_client_from_joseph", data)
    // })
})

module.exports = server

