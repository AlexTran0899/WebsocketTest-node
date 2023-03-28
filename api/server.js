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
    console.log(`user connected:  ${socket.id}`)
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
    })
})
module.exports = server

