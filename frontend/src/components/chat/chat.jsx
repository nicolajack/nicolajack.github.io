import { useState } from 'react'
import {useEffect } from 'react'
import './chat.css'

function Chat() {
    const [messages, setMessages] = useState([])
    const [userInput, setUserInput] = useState('')

    async function getResponse() {
        try {
            if (!userInput) return
            const response = await fetch('http://localhost:4000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userInput })
            })
            if (!response.ok) {
                throw new Error('Oops, something went wrong!')
            }
            const { message } = await response.json()
            fetch('http://localhost:4000/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input: userInput, response: message })
            })
            setMessages([...messages, userInput, message])
        } catch (error) {
            console.error(error)
            return 'Oops, something went wrong!'
        }
    }

    useEffect(() => {
        fetch('http://localhost:4000/logs')
            .then(res => res.json())
            .then(data => {
                let newMessages = []
                for (let i = 0; i < data.length; i++) {
                    newMessages.push(data[i].input)
                    newMessages.push(data[i].response)
                }
                setMessages(newMessages)
            })
    }, [])
    

    return (
        <div id="chat">
            <form onSubmit={(e) => e.preventDefault()}>
                <h2>ask me a question!</h2>
                <input type='text' name='user-input' id='questionInput' placeholder='what would you like to ask?' onChange={e => setUserInput(e.target.value)}></input>
                <button type='submit' onClick={getResponse}>submit</button>
            </form>
            {
                messages.map((text, index) => (
                    <div key={index} className="chatbox">
                        {index % 2 == 0 && <button className="x" onClick={() => deleteChatbox(index)}>X</button>}
                        <p className={index % 2 == 0 ? "user-message" : "chatbot-response"}>{text}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Chat