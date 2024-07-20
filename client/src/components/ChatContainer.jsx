import Contacts from "./Contacts"
import ChatFrame from "./ChatFrame"
import { useState, useEffect } from "react"
const ChatContainer = ({ socket }) => {

    const [contacts, SetContacts] = useState([])
    const [selectedContact, SetSelectedContact] = useState([])

    useEffect(() => {
        const handleActiveUsers = (users) => {
            SetContacts(users.filter(data => data.id !== socket.id))
        };

        socket.on("active-users", handleActiveUsers);

        return () => {
            socket.off("active-users", handleActiveUsers);
        };
    }, [socket]);

    console.log("active users",contacts);
    return (
        <div className="grid grid-cols-3 gap-4">
            <div>
                <Contacts contacts={contacts} SetContacts={SetContacts} SetSelectedContact={SetSelectedContact}/>
            </div>
            <div className="col-span-2">
                <ChatFrame socket={socket} selectedContact={selectedContact} />
            </div>
        </div>
    )
}

export default ChatContainer