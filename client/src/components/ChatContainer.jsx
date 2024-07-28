import { useRef } from "react";
import Contacts from "./Contacts"
import ChatFrame from "./ChatFrame"
import { useState, useEffect } from "react"
import { io } from "socket.io-client";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Welcome from "./Welcome";
const ChatContainer = () => {
    const socket = useRef();
    const { id } = useParams();
    const navigate = useNavigate();
    const [contacts, SetContacts] = useState([])
    const [selectedContact, SetSelectedContact] = useState(null)
    // const [onlineUsers, SetOnlineUsers] = useState([])

    useEffect(() => {
        // const handleActiveUsers = (users) => {
        //     SetOnlineUsers(Array.from(users.entries()).map(([userId, socketId]) => ({ userId, socketId })));
        // };
        if (id) {
            socket.current = io("http://localhost:5000");
            socket.current.emit("add-user", id);
            //socket.on("active-users", handleActiveUsers);
            // return () => {
            //     socket.current.off("active-users", handleActiveUsers);
            // };
            socket.current.on("user-added", () => {
                allUsers();
            });
    
            // Clean up on unmount
            return () => {
                socket.current.off("user-added");
            };
        } else {
            navigate("/")
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const allUsers = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/auth/allusers/${id}`)
        SetContacts(data)
    }

    useEffect(() => {
        
        if (id) {
            allUsers()
        }

    }, [id]);

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="overflow-y-scroll md:h-[55vh]">
                <Contacts contacts={contacts} SetContacts={SetContacts} SetSelectedContact={SetSelectedContact} />
            </div>
            <div className="col-span-2">
                {selectedContact === null ? <Welcome /> :
                    <ChatFrame socket={socket} selectedContact={selectedContact} id={id} />}
            </div>
        </div>
    )
}

export default ChatContainer