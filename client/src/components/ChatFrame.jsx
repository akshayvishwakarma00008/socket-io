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
                // eslint-disable-next-line react-hooks/exhaustive-deps
                socket.current.off("message-received", handleMessageReceived);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className="relative w-full py-5 mt-10 text-gray-700 bg-white shadow-md rounded-xl h-[80vh]">
                <div className="absolute top-0 flex items-center justify-center w-full h-16 bg-slate-50 rounded-t-xl">
                    {selectedContact?.username}
                </div>
                <div className="max-h-[100%] pt-16 overflow-y-scroll custom-scrollbar relative">
                    {messages.map((data, index) => (
                        <Message text={data?.message} isSent={data?.isSent} key={index} />
                    ))}
                </div>
                <div className="absolute bottom-0 w-full px-5 py-4 bg-slate-50 rounded-b-xl">
                    <ChatInput handleSendMessage={handleSendMessage} />
                </div>
            </div>
        </div>
    );
};

export default ChatFrame;
