import React, {useEffect, useState} from "react";
import  "./App.css"
import axios from "axios";

export const EventSourcing = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState()

    useEffect(() => {
        subscribe()
    },[])

    const subscribe = async () => {
            const eventSource = new EventSource("http://localhost:5000/connect")
            eventSource.onmessage = function (event) {
                const message = JSON.parse(event.data)

                setMessages(prevState => [message, ...prevState])
            }
    }


    const handler = (message) => {
        setValue(message)
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-message', {
            message: value,
            id: Date.now()
        })
    }

    return(
        <div>
            <div className="form">
                <input onChange={e => handler(e.target.value)} className="input-form"/>
                <button onClick={sendMessage} className="button-form">send</button>
            </div>
            {messages.map(i => {
                return (
                <div key={i.id}>
                    <span className="message">{i.message}</span>
                    <span className="message">{i.id}</span>
                </div>
            )})}
        </div>
    )
}