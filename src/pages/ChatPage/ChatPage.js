import '../Pages.css'
import './ChatPage.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import { fetchMessages, uploadMessage } from '../../API/ChatAPI';
import { auth } from '../../firebase';

const ChatPage = () => {

    const params = useParams();
    const location = useLocation();

    const [messages, setMessages] = useState({})
    const [messageText, setMessageText] = useState('')

    useEffect(() => {
        let mess = fetchMessages(params.pid, 1)
        //setMessages(mess)
        setInterval(() => {
            setMessages(mess);
          }, 1000);
    },[])

    const sendMessage = async () => {
        
        await uploadMessage(messageText, params.pid, auth.currentUser.uid)
        setMessageText('')
    }

    return <div id="chat-page-container" className='page-container'>
                <div id="chat-page-header-container"
                    className="page-header-container"
                >
                    <img src={location.state.avatar? location.state.avatar : process.env.PUBLIC_URL + '/Person_5.png' } alt='' id='avatar' />
                    <h1>{location.state.username}</h1>
                </div>
                <div id='chat-page-messages-container'>
                    {
                        Object.keys(messages).map(function(key) {
                            console.log(messages[key])
                            return (
                                <div key={key}>{messages[key]['message']}</div>
                            )
                        })
                    }
                </div>
                <div id="chat-page-message-text-container">
                    <input type='text' id="chat-page-message-text" value={messageText} onChange={(event) => setMessageText(event.target.value)} />
                </div>
                <div id="chat-page-message-button-container">
                    <button id="chat-page-message-button" onClick={sendMessage}>
                        <IoMdSend />
                    </button>
                </div>
            </div>
}

export default ChatPage