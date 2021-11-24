const io = require('socket.io-client');
const socket = io( "http://localhost:3000" );

socket.on('connect', async ()=>{
    console.log(`${socket.id} connected`)
    const data = "OptionalData"
    socket.emit( "getrooms", data, (rooms) =>{
        rooms.forEach((room, index) => {
            console.log(`room${index}: `, room)    
        });       
    })
})    

socket.on('error', async ()=>{
    console.log(`${socket.id} error`)
})    