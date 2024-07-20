import ChatInput from "./ChatInput";
import { useState } from "react"

/* eslint-disable react/prop-types */
const Message = ({ text, isSent }) => {
    return (
        <div className={`flex gap-2 px-5 ${isSent ? 'justify-end' : 'justify-start'} mb-5`}>
            {!isSent && <div className="w-10 h-10 rounded-full bg-slate-300"></div>}
            <div className={`p-2 rounded-lg ${isSent ? 'rounded-tr-none bg-[#7f31b3] text-white' : 'rounded-tl-none'} max-w-96 bg-slate-100`}>
                {text}
            </div>
            {isSent && <div className="w-10 h-10 rounded-full bg-slate-300"></div>}
        </div>
    );
};

const ChatFrame = ({ socket, selectedContact }) => {
    const [messages, setMessages] = useState([])
    // const [arrivalMessage, setArrivalMessage] = useState(null);

    const handleSendMessage = (msg) => {
        socket.emit("send-message", { msg, selectedContact })
        const msgs = [...messages];
        msgs.push({ message: msg, isSent: true })
        setMessages(msgs)
    }

    socket.on("message-recieved", (message) => {
        console.log("recieved message", message);
        const msgs = { message: message, isSent: false };
        setMessages([...messages, msgs]);
    })

    console.log("messages", messages);
    return (
        <div>
            <div className="relative w-full py-5 mt-10 text-gray-700 bg-white shadow-md rounded-xl">
                <div className="absolute flex items-center justify-center w-full h-16 top-1 bg-slate-50">
                    {selectedContact?.name}
                </div>
                <div className="overflow-y-scroll md:h-[55vh] pt-16 custom-scrollbar">
                    {messages.map((data, index) => (<Message text={data?.message} isSent={data?.isSent} key={index} />))}
                </div>
                <div className="px-5 py-4">
                    <ChatInput handleSendMessage={handleSendMessage} />
                </div>
            </div>

        </div>
    )
}

export default ChatFrame