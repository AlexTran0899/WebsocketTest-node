import io from 'socket.io-client'

export const getSocket = () => {
        let socket = io.connect("http://localhost:3001")

    return socket
}