const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())

app.use(bodyParser.json())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET","POST","PUT","DELETE"],
    }
})
let message = ""

app.get('/api/get/true', (req, res) => {
    res.json(true)
})
app.get('/api/get/false', (req, res) => {
    res.json(false)
})

app.get('/api/get/message', (req,res) => {
    res.json(message)
})

app.post('/api/post', (req, res) => {
    message = req.body.message
    res.json(message + "1")
})

io.on("connection", (socket) => {
    socket.on("light_bulb_state_to_server", (data) => {
        socket.broadcast.emit("light_bulb_state_to_client", data)
    })
    socket.on("light_bulb_state_to_server_from_joseph", (data) => {
        socket.broadcast.emit("light_bulb_state_to_client_from_joseph", data)
    })
})

module.exports = server

