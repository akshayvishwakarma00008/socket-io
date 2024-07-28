import { useRef } from "react";
import Contacts from "./Contacts"
import ChatFrame from "./ChatFrame"
import { useState, useEffect } from "react"
import { io } from "socket.io-client";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Welcome from "./Welcome";
import Header from "./Header"
const ChatContainer = () => {
    const socket = useRef();
    const { id } = useParams();
    const navigate = useNavigate();
    const [contacts, SetContacts] = useState([])
    const [selectedContact, SetSelectedContact] = useState(null)
    const [currentUserDetails, setCurrentUserDetails] = useState(null)
    // const [onlineUsers, SetOnlineUsers] = useState([])

    useEffect(() => {
        // const handleActiveUsers = (users) => {
        //     SetOnlineUsers(Array.from(users.entries()).map(([userId, socketId]) => ({ userId, socketId })));
        // };
        if (!id) {
            navigate("/");
            return;  // Early return to avoid executing further code if id is not defined
        }

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const allUsers = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/auth/allusers/${id}`)
        SetContacts(data)
    }

    const getCurrentUserDetails = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/auth/currentUserDetails/${id}`)
        setCurrentUserDetails(data)
    }

    useEffect(() => {

        if (id) {
            allUsers();
            getCurrentUserDetails()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div>
            {id && <><Header currentUserDetails={currentUserDetails} socket={socket}/>
                <div className="grid grid-cols-1 gap-4 mx-8 md:grid-cols-3">
                    <div>
                        <Contacts contacts={contacts} SetContacts={SetContacts} SetSelectedContact={SetSelectedContact} />
                    </div>
                    <div className="col-span-2">
                        {selectedContact === null ? <div className="flex items-center justify-center h-full"> <Welcome currentUserDetails={currentUserDetails} /> </div> :
                            <ChatFrame socket={socket} selectedContact={selectedContact} id={id} />}
                    </div>
                </div></>}
        </div>
    )
}

export default ChatContainer