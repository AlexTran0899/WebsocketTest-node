const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
const { uuid } = require('uuidv4');
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
const defMessage = {
    message: "hello world",
    light_bulb_state: true,
    josph_ballin: false
}

let route = [
{"id": "70b7d144-052e-4a4b-819c-29b7ce029258", 
"lat": 36.06958271606873,
"long": -94.16920373403134,
"itemName": "washing machine",
 "itemWeight": "heavy",
 "itemSize": "Large",
"itemType": "Metal",
 "itemNotes": "Please be careful there are dogs"
}, {"id": "70b7d144-052e-4a4b-819c-29b7ce029298", 
"lat": 36.073779922514824,
"long": -94.18023297659553,
"itemName": "Dryer machine",
 "itemWeight": "heavy",
"itemType": "Metal",
 "itemSize": "Large",
 "itemNotes": "It's going to be hard finding a place to park"
}]

let message = ""
let jsonObj = {
    message: "hello world",
    light_bulb_state: true,
    josph_ballin: false
}

app.get('/api/get/true', (req, res) => {
    res.json(true)
})
app.get('/api/get/false', (req, res) => {
    res.json(false)
})

app.get('/api/get/message', (req,res) => {
    res.json(message)
})

app.get('/api/get/json', (req,res) => {
    res.json(jsonObj)
})

app.get('/api/get/reset', (req,res) => {
    jsonObj = defMessage
    res.json(jsonObj)
})

app.post('/api/post/json', (req,res) => {
    // req.body = JSON.parse(req.body)
    req.body.lat =  parseFloat(req.body.lat)
    req.body.long = parseFloat(req.body.long)
    jsonObj = req.body

    res.json("json updated, maybe")
})

app.post('/api/post', (req, res) => {
    message = req.body.message
    res.json(message + "1")
})

app.get('/api/get/route', (req,res) => {
    res.json(route)
})

app.post('/api/post/route', (req,res) => {
    req.body.id = uuid()
    req.body.status = "pending"
    req.body.lat =  parseFloat(req.body.lat)
    req.body.long = parseFloat(req.body.long)
    res.json(route.push(req.body))
})

app.get('/api/post/reset', (req ,res) => {
    route = [
{"id": "70b7d144-052e-4a4b-819c-29b7ce029258", 
"lat": 36.06958271606873,
"long": -94.16920373403134,
"itemName": "washing machine",
 "itemWeight": "heavy",
 "itemSize": "Large",
"itemType": "Metal",
 "itemNotes": "Please be careful there are dogs"
}, {"id": "70b7d144-052e-4a4b-819c-29b7ce029298", 
"lat": 36.073779922514824,
"long": -94.18023297659553,
"itemName": "Dryer machine",
 "itemWeight": "heavy",
"itemType": "Metal",
 "itemSize": "Large",
 "itemNotes": "It's going to be hard finding a place to park"
}]
    res.json("route reset")
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

