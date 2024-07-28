
//import {io} from "socket.io-client";
//import ChatContainer from "./components/ChatContainer";
import HomePage from "./pages/HomePage";

function App() {
  //const socket = io("http://localhost:5000");
  return (
    <div className="flex justify-center">
      {/* <ChatContainer socket={socket}/> */}
      <HomePage/>

    </div>
  );
}

export default App;
