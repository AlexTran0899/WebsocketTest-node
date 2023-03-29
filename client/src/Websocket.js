import io from 'socket.io-client'

let socket = null

export const getSocket = () => {
    if (!socket) {
        socket = io.connect("http://localhost:3001")
    }
    return socket
}