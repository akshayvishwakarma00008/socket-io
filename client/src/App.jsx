import { useEffect } from 'react'
import './App.css'
import io from 'socket.io-client'

function App() {
  const socket = io('http://localhost:3000')

  function connectSocket(){
    // eslint-disable-next-line no-unused-vars
    socket.on('connect', (socket) => {
      console.log('connected')
    })
  }
  useEffect(()=>{
    connectSocket()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
     <h1>Reavt two way communication using socket-io</h1>
    </>
  )
}

export default App
