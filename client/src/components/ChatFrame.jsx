import { useEffect, useState, useRef } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";

const Message = ({ text, isSent }) => (
    <div className={`flex gap-2 px-5 ${isSent ? 'justify-end' : 'justify-start'} mb-5`}>
        {!isSent && <div className="w-10 h-10 rounded-full bg-slate-300"></div>}
        <div className={`p-2 rounded-lg ${isSent ? 'rounded-tr-none bg-[#7f31b3] text-white' : 'rounded-tl-none'} max-w-96 bg-slate-100`}>
            {text}
        </div>
        {isSent && <div className="w-10 h-10 rounded-full bg-slate-300"></div>}
    </div>
);

const ChatFrame = ({ socket, selectedContact, id }) => {
    const [messages, setMessages] = useState([]);
    const messagesRef = useRef([]);
    messagesRef.current = messages;
    
    const handleSendMessage = async (msg) => {
        if (msg.trim() === "") return;

        const newMessage = { message: msg, isSent: true };
        setMessages(prev => [...prev, newMessage]);

        socket.current.emit("send-message", { msg, to: selectedContact._id });

        try {
            await axios.post("http://localhost:5000/api/messages/add-msg/", {
                from: id,
                to: selectedContact._id,
                message: msg,
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        const handleMessageReceived = (message) => {
            console.log("Message received:", message);
            if (!messagesRef.current.some(msg => msg.message === message)) {
                setMessages(prevMessages => [...prevMessages, { message, isSent: false }]);
            }
        };

        if (socket.current) {
            socket.current.on("message-recieved", handleMessageReceived);
        }

        return () => {
            if (socket.current) {
                socket.current.off("message-received", handleMessageReceived);
            }
        };
    }, []);



    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedContact) {
                try {
                    const response = await axios.post("http://localhost:5000/api/messages/getmsg/", {
                        from: id,
                        to: selectedContact._id,
                    });
                    setMessages(response.data);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        };
        fetchMessages();
    }, [selectedContact, id]);

    return (
        <div>
            <div className="relative w-full py-5 mt-10 text-gray-700 bg-white shadow-md rounded-xl">
                <div className="absolute flex items-center justify-center w-full h-16 top-1 bg-slate-50">
                    {selectedContact?.username}
                </div>
                <div className="overflow-y-scroll md:h-[55vh] pt-16 custom-scrollbar">
                    {messages.map((data, index) => (
                        <Message text={data?.message} isSent={data?.isSent} key={index} />
                    ))}
                </div>
                <div className="px-5 py-4">
                    <ChatInput handleSendMessage={handleSendMessage} />
                </div>
            </div>
        </div>
    );
};

export default ChatFrame;
