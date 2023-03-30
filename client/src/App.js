import './App.css';
import io from 'socket.io-client'
import {useEffect, useState} from "react";

const socket = io.connect("https://websocketcackend.herokuapp.com/")

function App() {
    const [isOn, setIsOn] = useState(false)

    useEffect(() => {
        socket.on("light_bulb_state_to_client", (data) => {
            console.log(data.light_bulb_is)
            setIsOn(data.light_bulb_is)
        })
        socket.on("light_bulb_state_to_client_from_joseph", (data) => {
            if(data.light_bulb_is) {
                alert("Congratulation Joesph, you turn the light bulb on without turning it on")
            }
            setIsOn(data.light_bulb_is)
        })
    }, [])

    const sendState = (light_bulb_curr_state) => {
        socket.emit("light_bulb_state_to_server_from_joseph", {light_bulb_is: light_bulb_curr_state})
    }

    const onClick = () => {
        const light_bulb_curr_state = !isOn
        setIsOn(light_bulb_curr_state)
        sendState(light_bulb_curr_state)
    }

    return (
            <div className={isOn?"on" : ""} onClick={onClick}>
            <div className="light Z">
                <div className="wire"></div>
                <div className="bulb">
                    <span></span>
                    <span></span>
                </div>
            </div>
            </div>
    );
}

export default App;
