const {createServer} =  require('http');
const {Server} = require('socket.io');

const httpServer = createServer();
const socket = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

socket.on("connection",(socket)=>{
    
    socket.on("message",(data)=>{
        console.log(data);
    })
    socket.emit("message","hello");

});



httpServer.listen(3000)