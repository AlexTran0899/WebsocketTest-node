import './App.css';
import {getSocket} from "./Websocket";
import {useEffect, useState} from "react";

// const socket = io.connect("http://localhost:3001")

function App() {
    const [isOn, setIsOn] = useState(false)
    const socket = getSocket()

    socket.on("light_bulb_state_to_client" , (data) => {
        console.log("here")
        setIsOn(data.light_bulb_is)
    })
    const sendState = (light_bulb_curr_state) => {
        socket.emit("light_bulb_state_to_server", {light_bulb_is: light_bulb_curr_state})
    }

    const onClick = () => {
        const light_bulb_curr_state = !isOn
        setIsOn(light_bulb_curr_state)
        sendState(light_bulb_curr_state)
    }

    return (
            <body className={isOn?"on" : ""} onClick={onClick}>
            <div className="light Z">
                <div className="wire"></div>
                <div className="bulb">
                    <span></span>
                    <span></span>
                </div>
            </div>
            </body>
    );
}

export default App;
