import React, { useRef, useState} from "react";
import  "./App.css"


export const Socket = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState()
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState(" ")
    const socket = useRef()


    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: "connection",
                username,
                id: Date.now(),
            }

            socket.current.send(JSON.stringify(message))
        }

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prevState => [message, ...prevState])
        }

        socket.current.onclose = () => {

        }

        socket.current.onerror = () => {}
    }

    const sendMessage = () => {
       const message = {
           event: "message",
           username,
           message: value,
           id: Date.now(),
       }
        socket.current.send(JSON.stringify(message))
    }

    const handler = (value) => {
        setValue(value)
    }



    if(!connected) {
        return (
            <div className="form">
                <input value={username} onChange={e => setUsername(e.target.value)} className="input-form"/>
                <button onClick={connect} className="button-form">send</button>
            </div>
        )
    }

  else
    return(
        <div>
            <div className="form">
                <input onChange={e => handler(e.target.value)} className="input-form"/>
                <button onClick={sendMessage} className="button-form">send</button>
            </div>
            {messages.map(i => {
                switch (i.event) {
                    case "message":
                        return(
                            <div className="message">
                                <span>{i.message}</span>
                            </div>
                        )
                    case "connection":
                        return (
                            <div className="connection-required">
                                <span>Пользователь {i.username} подключен!</span>
                            </div>
                        )
                }
            })}
        </div>
    )
}