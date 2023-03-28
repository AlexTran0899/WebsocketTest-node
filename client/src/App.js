import './App.css';
import io from 'socket.io-client'
import {useEffect, useState} from "react";

const socket = io.connect("http://localhost:3001")



function App() {
    const [message, setMessage] = useState('')
    const [messageReceive, setMessageReceive] = useState('')

    useEffect(() => {
        socket.on("receive_message", (data) => {
            // setMessageReceive(data.message)
            alert(data.message)
        })
    }, [socket])
    const sendMessage = () => {
        socket.emit("send_message", {message})
    }
    const onChange = (e) => {
        const value = e.target.value
        setMessage(value)
    }

    return (
        <div className="App">
            <input placeholder="Message..." onChange={onChange}/>
            <button onClick={sendMessage}>Send message</button>
            <h1>`Message receive ${messageReceive}`</h1>
        </div>
    );
}

export default App;
