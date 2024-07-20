import "./App.css";
import {io} from "socket.io-client";
import ChatContainer from "./components/ChatContainer";

function App() {
  const socket = io("http://localhost:5000");
  return (
    <>
      <ChatContainer socket={socket}/>
    </>
  );
}

export default App;
