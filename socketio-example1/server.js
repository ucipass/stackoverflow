const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const sockets = new Map() // holds all active sockets

app.get('/', (req, res) => {
    res.send('My server is working!')
});

io.on('connection', (socket) => {
    console.log(`${socket.id}: connected`);
    sockets.set(socket.id,socket) // add socket to Map object
    socket.join("ChessRoom") // join socket to demo room
    
	socket.on('disconnect', (data)=>{
		console.log(`${socket.id} disconnected`);
		sockets.delete(socket.id) // delete socket from Map object
	})

	socket.on('getrooms', (data,replyFn)=>{
		console.log(`${socket.id}: received getrooms event with ${data}`);
		const rooms = Array.from(io.sockets.adapter.rooms).map( (room) => {
            return { name: room[0], members: Array.from(room[1])}
        })
		replyFn(rooms)
	})

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
