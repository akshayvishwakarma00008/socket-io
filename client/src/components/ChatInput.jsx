import { Button } from 'antd';
import { useState } from 'react';

const ChatInput = ({ handleSendMessage }) => {
    const [msg, setMsg] = useState("");
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMessage(msg);
            setMsg("");
        }
    };
    return (
        <div>
            <div className="flex items-center w-full gap-2 rounded-sm">
                <input
                    type="text"
                    placeholder="type your message here"
                    className='w-4/5 h-12 pl-4 text-lg rounded-md bg-slate-200 focus:outline-none'
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <Button type="primary" className='h-12 w-36' onClick={(event) => sendChat(event)}>
                    send
                </Button>
            </div>
        </div>
    )
}

export default ChatInput