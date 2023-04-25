import React, {useEffect, useState} from "react";
import  "./App.css"
import axios from "axios";

export const Longpolling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState()

    useEffect(() => {
        subscribe()
    },[])
    
    const subscribe = async () => {
        try{
            const messages = await axios.get('http://localhost:5000/get-messages').then(res => res.data.message)
            console.log(messages)
            setMessages(prev => [messages, ...prev])
            await subscribe()
        }
        catch (e) {
            setTimeout(() => subscribe() , 500)
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
            {messages.map(i => {return (
                    <span className="message">{i}</span>
            )})}
        </div>
    )
}